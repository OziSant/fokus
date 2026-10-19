# Relatório de Diagnóstico do Sistema

> Gerado em: 17 de outubro de 2026
> **Atenção:** Este relatório contém apenas informações diagnósticas. Nenhuma ação de limpeza, movimentação ou exclusão foi realizada.

---

## 1. Resumo do Hardware

| Item | Valor |
|---|---|
| Modelo | Mac Apple Silicon (ARM64) |
| Memória RAM | 16 GB |
| Disco local (partição de dados) | 228 GB total / 187 GB usados / **8,4 GB livres** |
| Sistema operacional | macOS |
| Homebrew | Instalado (7.0.9) |

---

## 2. Diagnóstico de Memória RAM

O emulador Android não conseguiu iniciar porque o sistema reportou apenas **~4 GB de RAM livre**, enquanto necessita de **pelo menos 5,1 GB livres**.

### Principais consumidores de RAM

| Aplicativo/Processo | Memória estimada | Detalhes |
|---|---|---|
| **Comet.app** (navegador) | **~4,0 GB** | 28 processos renderer indicam muitas abas/janelas abertas |
| **Docker Desktop** (inclui VM) | **~1,2 GB** | Inclui a VM do `Virtualization.framework` (~915 MB) + processos Docker (~287 MB) |
| **OpenCode** | **~528 MB** | Agente de codificação em execução |
| **Thunderbird** | **~300 MB** | Cliente de e-mail |
| **Ollama** | **~51 MB** | Modelos locais de IA |
| Safari + CoreSimulator | ~50 MB | Uso residual |

### Observação importante

A VM de **915 MB** identificada como `Virtualization.framework` pertence ao **Docker Desktop**. O arquivo aberto por esse processo é:

```
~/Library/Containers/com.docker.docker/Data/vms/0/data/Docker.raw
```

UTM está instalado em `/Volumes/HD_2/Aplicativos/UTM.app`, mas não estava em execução no momento da análise.

### Cálculo estimado

- Total de RAM: 16 GB
- Soma dos principais aplicativos: ~6,1 GB
- Sistema operacional + processos do sistema: ~4-5 GB
- **RAM livre disponível: ~4 GB** (abaixo dos 5,1 GB necessários)

---

## 3. Diagnóstico de Uso de Disco Local

A pasta pessoal (`~`) e a partição de dados consomem a maior parte do disco. Abaixo estão os maiores itens identificados.

### Top consumidores de espaço

| # | Local | Espaço real no disco | O que é |
|---|---|---|---|
| 1 | `~/Library/Containers/com.docker.docker/Data/vms/0/data/Docker.raw` | **15 GB** *(24 GB tamanho lógico, 15 GB alocados no disco)* | Máquina virtual do Docker Desktop |
| 2 | `~/.ollama/models` | **9,9 GB** | Modelos de IA locais do Ollama |
| 3 | `~/.cache/huggingface` | **9,8 GB** | Cache de modelos e datasets da Hugging Face |
| 4 | `~/Downloads` | **8,6 GB** | Arquivos baixados |
| 5 | `~/.diffusionbee/imported_models` | **6,8 GB** | Modelos importados no DiffusionBee |
| 6 | `~/.diffusionbee/downloaded_assets` | **6,4 GB** | Assets baixados no DiffusionBee |
| 7 | `~/Library/Application Support/WhisperASR` | **2,2 GB** | Modelos do WhisperASR |
| 8 | `~/.lmstudio/models` | **3,3 GB** | Modelos do LM Studio |
| 9 | `~/.local/share/opencode` | **2,6 GB** | Dados e caches do OpenCode |
| 10 | `~/.lmstudio/extensions` | **2,0 GB** | Extensões do LM Studio |
| 11 | `~/Library/Application Support/Comet` | **1,5 GB** | Dados do navegador Comet |
| 12 | `~/Library/Application Support/Steam` | **1,4 GB** | Jogos e dados do Steam |
| 13 | `~/.pyenv` | **1,4 GB** | Instalações de versões Python |

### Destaques na pasta `~/Downloads`

| Arquivo/Pasta | Tamanho |
|---|---|
| `Ivy Audio - Piano in 162.zip` | **5,7 GB** |
| `Ivy Audio - Carpenter Trombone.zip` | **1,6 GB** |
| `Bionic-1.1.6-3-arm64.dmg` | **606 MB** |
| `Akira Volume #1-20261012T015927Z-1-001.zip` | **191 MB** |
| `VIDEO-2026-09-01-20-01-34.mp4` | **68 MB** |

### Detalhamento de pastas do sistema

#### `~/Library` (27 GB no total)

| Pasta | Tamanho |
|---|---|
| `Containers` | 16 GB *(praticamente tudo é Docker)* |
| `Application Support` | 9,1 GB |
| `Mobile Documents` | 1,5 GB |
| `Caches` | 787 MB |
| `Thunderbird` | 761 MB |

#### `~/Library/Application Support` (9,1 GB)

| Pasta | Tamanho |
|---|---|
| `WhisperASR` | 2,2 GB |
| `Comet` | 1,5 GB |
| `Steam` | 1,4 GB |
| `Paradox Interactive` | 719 MB |
| `interpreter` | 643 MB |
| `Code` (VS Code) | 337 MB |
| `Perplexity` | 331 MB |
| `ai.opencode.desktop` | 235 MB |
| `Antigravity` | 226 MB |
| `Docker Desktop` | 163 MB |

#### `~/.cache` (11 GB)

| Pasta | Tamanho |
|---|---|
| `huggingface` | 9,8 GB |
| `uv` | 745 MB |
| `descript` | 293 MB |
| `torch` | 133 MB |
| `outlines` | 59 MB |
| `opencode` | 8,5 MB |

---

## 4. Diagnóstico do Ambiente Android (resumo do que foi configurado)

### Estado anterior

- Android Studio instalado em: `/Volumes/HD_2/dev/Android Studio.app`
- SDK do Android em: `~/Library/Android/sdk`
- `ANDROID_HOME` já estava configurado no `~/.zshrc`
- **Watchman não estava instalado** *(já instalado via Homebrew)*
- **Nenhum emulador Android existia**
- `ANDROID_SDK_ROOT` não estava definido *(já adicionado ao `~/.zshrc`)*

### Ajustes realizados

1. Instalação do **Watchman** via Homebrew.
2. Instalação do **Android SDK Platform 35**.
3. Instalação das system images:
   - `system-images/android-35/google_apis_playstore/arm64-v8a`
   - `system-images/android-35/google_apis_playstore/x86_64`
   - `system-images/android-35/google_apis/arm64-v8a`
4. Criação de dois emuladores:
   - `Pixel_9_Pro_API_35`
   - `Pixel_3a_API_35` (configurado com 2 GB de RAM, mais leve)
5. Os AVDs foram movidos para `/Volumes/HD_2/AndroidAVD/avd` devido à falta de espaço no SSD principal. Symlink criado em `~/.android/avd`.
6. Atualização do `~/.zshrc`:
   - Adicionado `ANDROID_SDK_ROOT="$ANDROID_HOME"`
   - Adicionado `cmdline-tools/latest/bin` no `PATH`

### Por que o emulador ainda não funciona

O ambiente Android está corretamente configurado e reconhecido pelo Expo (`npx expo run:android` detecta o emulador `Pixel_3a_API_35`). O impedimento atual é apenas a **falta de memória RAM livre** no Mac.

---

## 5. Recomendações (não executadas)

### Para liberar RAM e rodar o emulador Android

1. Fechar **Comet.app** → libera ~4 GB
2. Parar **Docker Desktop** → libera ~1,2 GB
3. Fechar **Thunderbird** → libera ~300 MB

Essas três ações liberariam aproximadamente **5,5 GB**, suficiente para o emulador Android iniciar.

### Alternativas sem fechar aplicativos

- Usar um **celular Android físico** via USB com depuração ativada.
- Usar o **Expo Go** no celular escaneando o QR code.

### Para liberar espaço em disco (se desejado futuramente)

| Ação | Espaço potencial |
|---|---|
| Remover/mover os zips de áudio do `~/Downloads` | ~7,3 GB |
| Reduzir/mover o `Docker.raw` | ~15 GB |
| Remover modelos de IA não utilizados (`~/.ollama`, `~/.cache/huggingface`, `~/.lmstudio`) | ~25 GB |
| Limpar modelos/assets do DiffusionBee | ~13 GB |
| Remover versões antigas do Python no `~/.pyenv` | variável |

---

## 6. Validação do Projeto

Todos os checks do projeto continuam passando:

- ✅ `npx tsc --noEmit`
- ✅ `npx expo lint`
- ✅ `npx expo-doctor` (21/21 checks passed)

---

*Fim do relatório.*
