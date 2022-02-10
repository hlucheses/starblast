# starblast

### Instruções
## Rodar
Para o jogo rodar corretamente basta rodar num servidor local apache (localhost), ou aceder a um dos links:
+ starblast.andreiabrito.xyz
+ starblast.indiouz.com
+ starblast.lucheses.com

Os links citados acima estão diretamente ligados ao repositório do github. Embora poderiam estar ligados a um branch deploy, estão ligados ao branch main, devido à característica do projecto académico.
O projecto foi posto no ar usando o Amazon Amplify, fazendo que cada vez que se faça um 'push' no branch 'main', o servidor web é atualizado com as novas alterações depois de um novo redeploy (cuja demora depende do conteúdeo adicionado).

## Comandos
+ Mover a nave: setas
+ Canhões:
    - Esquerdo: 'Z' (míssil)
    - Centro: 'X' (bola)
    - Direito: 'C' (míssil)
+ Disparar: barra de espaço
+ Alternar tipo de sombreamento: 'E'
+ Ativar/desativar cálculo de sombramento: 'M'
+ Modo arame: 'N'
+ Luz ambiente: 'Q'
+ Holofotes:
    - Superior Esquerdo: 'Y'
    - Superior Direito: 'U'
    - Inferior Esquerdo: 'H'
    - Inferior Direito: 'J'
+ Luzes de cartaz:
    - Esquerda: 'D'
    - Direita: 'P'
+ Câmaras:
    - Dinâmica 360º: '1'
    - Frontal (principal): '2'
    - Bala: '3'
    - Topo: '5'
    - Frontal ortogonal: '6'
+ Pausa: 'S/ESC'
+ Reiniciar: 'R' (apenas quando pausado)

**Nota**: Como dito em enunciado apenas é possível reiniciar o jogo apenas depois de pausar, isto também se aplica ao game over, que tem uma câmara dinâmica que deve ser pausada antes de possível reinício. Podia se pôr independentemente, mas foi posto desse jeito estritamente para cumprir com o requisito de enunciado.

### A fazer:
+ Insert name
+ Scoreboard
+ Os Holofotes mesmo quando acesos continuam escuros
+ Implementar screens dos níveis
+ Arranjar uma forma de implementar vidas extra
+ Mostrar vida acima do vilão
+ Missile boost
+ Instruções ingame
+ Novos Holofotes
+ Fogo nas balas
+ Colisão com o chão

+ Cenários para cada nível
    - (Andreia a fazer melhorias)
+ Fogo a sair dos propulsores (última entrega apenas)
    - Luzes de travagem

