# Testes de Performance em Sistemas Distribuídos com k6

Projeto desenvolvido para a disciplina de **Sistemas Distribuídos** 

## 📋 Sobre a API

A aplicação consiste em um servidor HTTP desenvolvido em **Node.js** nativo (sem dependências externas) que expõe um endpoint para realizar a soma de dois números via query string[cite: 13]:

- **Endpoint:** `GET /soma?a={numero1}&b={numero2}`
- **Porta padrão:** `3000`
- **Exemplo de resposta (`200 OK`):**
  ```json
  {
    "resultado": 30
  }
  ```

## 📁 Estrutura do Projeto

```text
├── server.js               # Servidor HTTP da API em Node.js
└── scripts/
    ├── 1-smoke.js          # Teste de Fumaça (Smoke Test)
    ├── 2-load.js           # Teste de Carga (Load Test)
    ├── 3-stress.js         # Teste de Estresse (Stress Test)
    ├── 4-soak.js           # Teste de Encharcamento (Soak Test)
    ├── 5-spike.js          # Teste de Pico (Spike Test)
    └── 6-breakpoint.js     # Teste de Ruptura (Breakpoint Test)
```

## 🚀 Pré-requisitos e Execução

### Pré-requisitos
- [Node.js](https://nodejs.org/) (v18 ou superior)
- [k6](https://k6.io/docs/get-started/installation/)

### 1. Iniciar a API
Em um terminal na raiz do projeto, execute:
```bash
node server.js
```

### 2. Executar os Testes de Carga
Com o servidor ativo, abra outro terminal e execute cada script individualmente:
```bash
k6 run scripts/1-smoke.js
k6 run scripts/2-load.js
k6 run scripts/3-stress.js
k6 run scripts/4-soak.js
k6 run scripts/5-spike.js
k6 run scripts/6-breakpoint.js
```

## 📊 Resultados Obtidos

As métricas abaixo foram coletadas localmente avaliando o tempo de resposta (`http_req_duration`), a taxa de falhas (`http_req_failed`) e o volume total de requisições (`http_reqs`)[cite: 13, 15, 16, 17, 18, 19, 20]:

| Tipo de Teste | VUs Máx. | Duração | `http_req_duration` (Média) | `http_req_duration` (p95) | `http_req_failed` | Total de Req. (`http_reqs`) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **1. Smoke Test** | 3 | 30s | 3.93 ms | 23.7 ms | 0.00% (0 de 90) | 90 |
| **2. Load Test** | 50 | 2m0s | 829.01 µs | 1.41 ms | 0.00% (0 de 4529) | 4.529 |
| **3. Stress Test** | 200 | 2m0s | 739.22 µs | 1.31 ms | 0.00% (0 de 13559) | 13.559 |
| **4. Soak Test** | 50 | 6m0s | 735.01 µs | 1.29 ms | 0.00% (0 de 16508) | 16.508 |
| **5. Spike Test** | 400 | 1m0s | 675.9 µs | 1.25 ms | 0.00% (0 de 12375) | 12.375 |
| **6. Breakpoint Test** | 1.000 | 2m0s | 865.06 µs | 2.00 ms | 0.00% (0 de 60367) | 60.367 |

## 🔍 Análise Resumida

- **Smoke Test:** Validou o funcionamento básico da rota com latência média de `3.93 ms` devido ao aquecimento inicial (*cold start*) do runtime[cite: 11, 20].
- **Load, Stress e Soak Tests:** Após o aquecimento do motor V8, a API estabilizou com tempos médios abaixo de `1 ms` e zero falhas HTTP, mesmo sustentando carga contínua por 6 minutos (*Soak*) ou escalando para 200 usuários simultâneos (*Stress*)[cite: 17, 18, 19].
- **Spike Test:** O *event loop* do Node.js absorveu o salto abrupto de 10 para 400 VUs sem perda de requisições[cite: 16].
- **Breakpoint Test:** A aplicação suportou até 1.000 VUs simultâneos (~499 req/s) sem falhas, apresentando apenas uma elevação controlada no percentil `p95` (`2.00 ms`)[cite: 15].

## 👤 Autor

- **Heliel William da Silva** — Tecnologia em Sistemas para Internet (IFRN)
