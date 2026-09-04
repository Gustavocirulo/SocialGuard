# SocialGuard

Plataforma para classificação automatizada de conteúdo de redes sociais utilizando Inteligência Artificial, com foco em **escalabilidade, processamento assíncrono e desacoplamento da camada de classificação**.

> Projeto acadêmico desenvolvido para a disciplina de Arquitetura de Software.

---

## Sobre o projeto

O SocialGuard é uma plataforma projetada para analisar publicações de redes sociais e classificá-las de acordo com possíveis violações de políticas ou critérios previamente definidos.

A solução foi concebida para trabalhar com dois modos principais de processamento:

- **Análise síncrona:** processamento individual de uma publicação, com retorno imediato do resultado.
- **Análise em lote:** processamento assíncrono de grandes volumes de publicações, permitindo que o usuário acompanhe o progresso sem manter uma requisição HTTP aberta durante todo o processamento.

O projeto tem como principal objetivo explorar como decisões de **Arquitetura de Software** podem melhorar a escalabilidade e a eficiência de aplicações que utilizam modelos de Inteligência Artificial para processamento de grandes volumes de dados.

---

## Problema

Uma abordagem simples para classificar publicações utilizando IA consiste em enviar cada publicação diretamente para o modelo:

```text
Publicação
    ↓
API
    ↓
Modelo de IA
    ↓
Resultado