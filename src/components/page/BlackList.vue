<template>
    <div id="box">
        <a href="https://github.com/css-doodle/css-doodle">一个用 css 来绘制图案 web 组件</a>
        <css-doodle use="var(--rule)"></css-doodle>
    </div>
</template>
<script>
import CSSDoodle from 'css-doodle';
export default {
    name: 'blacklist',
        data() {
            return {}
        }
}
</script>
<style lang="scss" scoped>
#box{
    height: 100%; 
    margin: 0; 
    background: #270F34; 
    overflow: hidden; 
    display: flex; 
    align-items: center; 
    justify-content: center;
}
#box a{
    display: none;
}
css-doodle {
    --color: @p(#51eaea, #fffde1, #ff9d76, #FB3569);
    --filter: @svg-filter(<svg>
      <filter>
        <feTurbulence
          type="fractalNoise"
          baseFrequency=".08"
          numOctaves="2"
          seed="200"
        />
        <feDisplacementMap
          in="SourceGraphic"
          scale="100"
        />
      </filter>
    </svg>);

    --rule: (
      :doodle {
        @grid: 30x1 / 18vmin;
      }
      :container {
        perspective: 30vmin;
      }

      @place-cell: center;
      @size: 100%;
    
      :after, :before {
        content: '';
        @size: 100%;
        position: absolute;
        border: 2.4vmin solid var(--color);
        border-image: radial-gradient(
          var(--color), transparent 60%
        );
        border-image-width: 4;
        transform: rotate(@pn(0, 5deg));
      }

      will-change: transform, opacity;
      animation: scale-up 15s linear infinite;
      animation-delay: calc(-15s / @size() * @i());
      box-shadow: inset 0 0 1em var(--color);
      border-radius: 50%;
      filter: var(--filter); 
    
      @keyframes scale-up {
        0%, 100% {
          transform: translateZ(0) scale(0) rotate(0);
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        99% {
          transform: 
            translateZ(30vmin) 
            scale(1) 
            rotate(-270deg);
        }
      }
    )
  }
</style>
