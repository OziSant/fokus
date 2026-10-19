#!/usr/bin/env node

/**
 * Limpa caches do Expo/Metro sem apagar node_modules.
 * Use quando o servidor travar em "Loading..." ao iniciar.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const homeDir = require('os').homedir();

function log(message) {
  console.log(`\x1b[36m[clean-cache]\x1b[0m ${message}`);
}

function rmSafe(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    log(`Removido: ${path.relative(projectRoot, dir)}`);
  }
}

function killProjectProcesses() {
  try {
    // Lista processos node/metro/expo que estão rodando nesta pasta
    const output = execSync(
      `ps aux | grep -E 'node|metro|expo' | grep '${projectRoot}' | grep -v grep | awk '{print $2}'`,
      { encoding: 'utf-8', shell: true }
    );
    const pids = output.trim().split('\n').filter(Boolean);
    if (pids.length > 0) {
      for (const pid of pids) {
        try {
          process.kill(Number(pid), 'SIGTERM');
          log(`Processo encerrado: ${pid}`);
        } catch {
          // processo já morreu
        }
      }
      // Pequena pausa para garantir liberação de portas
      execSync('sleep 1');
    }
  } catch {
    // nenhum processo encontrado
  }
}

function main() {
  log('Limpando caches do projeto...');

  killProjectProcesses();

  // Caches locais do projeto
  rmSafe(path.join(projectRoot, '.expo'));
  rmSafe(path.join(projectRoot, 'node_modules', '.cache'));
  rmSafe(path.join(projectRoot, 'ios'));
  rmSafe(path.join(projectRoot, 'android'));

  // Caches globais do Expo
  rmSafe(path.join(homeDir, '.expo', 'cache'));

  // Limpa watchman se existir
  try {
    execSync('watchman watch-del-all', { stdio: 'ignore' });
    log('Watchman resetado.');
  } catch {
    // watchman não instalado
  }

  log('Pronto! Agora rode: npm start');
}

main();
