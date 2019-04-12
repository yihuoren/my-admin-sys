<template>
    <!-- <div class="g-container">
        <div class="g-queue">
            <div class="g-item"></div>
            <div class="g-item"></div>
            <div class="g-item"></div>
            <div class="g-item"></div>
            <div class="g-item"></div>
            <div class="g-item"></div>
            <div class="g-item"></div>
            <div class="g-item"></div>
        </div>
        <div class="g-queue">
            <div class="g-item"></div>
            <div class="g-item"></div>
            <div class="g-item"></div>
            <div class="g-item"></div>
            <div class="g-item"></div>
            <div class="g-item"></div>
            <div class="g-item"></div>
            <div class="g-item"></div>
        </div>
        <div class="g-queue">
            <div class="g-item"></div>
            <div class="g-item"></div>
            <div class="g-item"></div>
            <div class="g-item"></div>
            <div class="g-item"></div>
            <div class="g-item"></div>
            <div class="g-item"></div>
            <div class="g-item"></div>
        </div>
        <div class="g-queue">
            <div class="g-item"></div>
            <div class="g-item"></div>
            <div class="g-item"></div>
            <div class="g-item"></div>
            <div class="g-item"></div>
            <div class="g-item"></div>
            <div class="g-item"></div>
            <div class="g-item"></div>
        </div>
    </div> -->
    <!-- <div class="g-container">
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
    </div> -->
    <div class="g-container">
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
        <div class="g-item"></div>
    </div>
</template>

<script>
    export default {
        name: 'dashboard',
        data() {
            return {
                name: localStorage.getItem('ms_username')
            }
        }
    }

</script>


<style <style lang="scss" scoped>
// $lineCount: 4;
// $count: 8;

// @function randomNum($max, $min: 0, $u: 1) {
//     @return ($min + random($max)) * $u;
// }

// @function randomColor() {
//     @return rgb(randomNum(255), randomNum(255), randomNum(255));
// }

// .g-container {
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     overflow: hidden;
// }

// .g-queue {
//     display: flex;
//     flex-direction: column;
//     flex-basis: 24%;

// }

// .g-item {
//     position: relative;
//     width: 100%;
//     margin: 2.5% 0;
// }

// @for $i from 1 to $lineCount+1 {
//     .g-queue:nth-child(#{$i}) {
//         @for $j from 1 to $count+1 {
//             .g-item:nth-child(#{$j}) {
//                 height: #{randomNum(300, 50)}px;
//                 background: randomColor();

//                 &::after {
//                     content: "#{$j}";
//                     position: absolute;
//                     color: #fff;
//                     font-size: 24px;
//                     top: 50%;
//                     left: 50%;
//                     transform: translate(-50%, -50%);
//                 }
//             }
//         }
//     }
// }

// $count: 32;

// @function randomNum($max, $min: 0, $u: 1) {
//     @return ($min + random($max)) * $u;
// }

// @function randomColor() {
//     @return rgb(randomNum(255), randomNum(255), randomNum(255));
// }

// .g-container {
//     column-count: 4;
//     column-gap: .5vw;
//     padding-top: .5vw;
// }

// .g-item {
//     position: relative;
//     width: 24vw;
//     margin-bottom: 1vw;
//     break-inside: avoid;
// }

// @for $i from 1 to $count+1 {
//     .g-item:nth-child(#{$i}) {
//         height: #{randomNum(300, 50)}px;
//         background: randomColor();

//         &::after {
//             content: "#{$i}";
//             position: absolute;
//             color: #fff;
//             font-size: 2vw;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//         }
//     }
// }

$count: 8;

@function randomNum($max, $min: 0, $u: 1) {
    @return ($min + random($max)) * $u;
}

@function randomColor() {
    @return rgb(randomNum(255), randomNum(255), randomNum(255));
}

.g-container {
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(8, 1fr);
}

@for $i from 1 to $count+1 {
    .g-item:nth-child(#{$i}) {
        position: relative;
        background: randomColor();
        margin: 0.5vw;

        &::after {
            content: "#{$i}";
            position: absolute;
            color: #fff;
            font-size: 2vw;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}

.g-item {
    &:nth-child(1) {
        grid-column: 1;
        grid-row: 1 / 3;
    }
    &:nth-child(2) {
        grid-column: 2;
        grid-row: 1 / 4;
    }
    &:nth-child(3) {
        grid-column: 3;
        grid-row: 1 / 5;
    }
    &:nth-child(4) {
        grid-column: 4;
        grid-row: 1 / 6;
    }
    &:nth-child(5) {
        grid-column: 1;
        grid-row: 3 / 9;
    }
    &:nth-child(6) {
        grid-column: 2;
        grid-row: 4 / 9;
    }
    &:nth-child(7) {
        grid-column: 3;
        grid-row: 5 / 9;
    }
    &:nth-child(8) {
        grid-column: 4;
        grid-row: 6 / 9;
    }
}
</style>
