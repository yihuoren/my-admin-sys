<template>
    <div id="scrollTop">
        <div v-if="number === 0">
            <div class="color_box"></div>
            <div class="title sticky">使用 `position:sticky` 实现</div>
            <div class="color_box_two"></div>
        </div>
        <div v-else-if="number === 1">
            <div class="color_box"></div>
            <div class="title_box" ref="pride_tab_fixed">
                <div class="title" :class="titleFixed == true ? 'isFixed' :''">使用 JQuery 的 `offset().top` 实现</div>
            </div>
            <div class="color_box_two"></div>
        </div>
        <div v-else-if="number === 2">
            <div class="color_box"></div>
            <div class="title_box" ref="pride_tab_fixed">
                <div class="title" :class="titleFixed == true ? 'isFixed' :''">使用原生的 `offsetTop` 实现</div>
            </div>
            <div class="color_box_two"></div>
        </div>
        <div v-else>
            <div class="color_box"></div>
            <div class="title_box" ref="pride_tab_fixed">
                <div class="title" :class="titleFixed == true ? 'isFixed' :''">使用 `obj.getBoundingClientRect().top` 实现</div>
            </div>
            <div class="color_box_two"></div>
        </div>
        <!-- <div class="bottom_tab">
            <div class="sub_tab" v-for="(dateTab, index) in dateTabs" @click="change(index)" :class='{active:index===number}'>{{dateTab}}</div>
        </div> -->
    </div>
</template>
<script>
import _ from 'lodash'
export default {
    name: 'reconsider',
    data() {
        return {
            number: 3,
            dateTabs:['第一种', '第二种', '第三种', '第四种'],
            titleFixed: ''
        }
    },
    watch:{
        number: function(){
            let self = this;
            if(self.number === 1){
                window.addEventListener('scroll', self.handleScrollOne);
                window.removeEventListener('scroll', self.handleScrollTwo);
            }else if(self.number === 2){
                window.addEventListener('scroll', _.throttle(self.handleScrollTwo, 50));
                window.removeEventListener('scroll', self.handleScrollOne);
            }else if(self.number === 3){
                window.removeEventListener('scroll', self.handleScrollOne);
                window.removeEventListener('scroll', self.handleScrollTwo);
                self.IntersectionObserverFun()
            }else{
                window.removeEventListener('scroll', self.handleScrollOne);
                window.removeEventListener('scroll', self.handleScrollTwo);
            }
        }
    },
    mounted(){
        if( this.number === 3 ){
            this.IntersectionObserverFun()
        }
    },
    methods: {
        change: function (index) {
            this.number = index;
        },
        handleScrollOne: function() {
            let self = this;
            let scrollTop = $('html').scrollTop();
            let offsetTop = $('.title_box').offset().top;
            self.titleFixed = scrollTop > offsetTop;
        },
        handleScrollTwo: function() {
            let self = this;
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            let offsetTop = self.getOffset(self.$refs.pride_tab_fixed);
            self.titleFixed = scrollTop > offsetTop;
        },
        IntersectionObserverFun: function() {
            let self = this;
            let ele = self.$refs.pride_tab_fixed;
            if( !IntersectionObserver ){
                let observer = new IntersectionObserver(function(){
                    let offsetTop = ele.getBoundingClientRect().top;
                    self.titleFixed = offsetTop < 0;
                }, {
                    threshold: [1]
                });
                observer.observe(document.getElementsByClassName('title_box')[0]);
            } else {
                window.addEventListener('scroll', _.throttle(function(){
                    let offsetTop = ele.getBoundingClientRect().top;
                    self.titleFixed = offsetTop < 0;
                }, 50));
            }
        },
        getOffset: function(obj,direction){
            let offsetL = 0;
            let offsetT = 0;
            while( obj!== window.document.body && obj !== null ){
                offsetL += obj.offsetLeft;
                offsetT += obj.offsetTop;
                obj = obj.offsetParent;
            }
            if(direction === 'left'){
                return offsetL;
            }else {
                return offsetT;
            }
        }
    }
}
</script>
<style scoped>
.bottom_tab {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #999;
    background: #fff;
}
.sub_tab {
    box-sizing: border-box;
    width: 25%;
    height: 100%;
    line-height: 40px;
    text-align: center;
    border-right: 1px solid #999;
}
.sub_tab:last-child {
    border: none;
}
.active {
    background: #999;
    color: #fff;
}
.color_box {
    width: 100%;
    height: 800px;
    background: #333;
}
.color_box_two {
    width: 100%;
    height: 1000px;
    background: -webkit-linear-gradient(top,#333333 20%,#999999 40%, #333333 80%)
}
.title_box {
    height: 40px;
    background: #999;
}
.title {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background: #999;
    color: #fff;
    font-size: 16px;
    /*transition: all 10s ease-in-out;*/
}
.isFixed{
    position:fixed;
    top: 0;
    left: 0;
    z-index:99;
}
.sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
}
</style>
