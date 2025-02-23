<template>
  <div>
    <h2>网站说明书</h2>
    <div class="row">
        <div class="col-md-8">
            <ul>
                <li>
                    <hr>
                    <p>
                        课余编写，代码一坨，如有错误，欢迎指正qwq(vue3练手)
                    </p>
                </li>
                <li>
                    <hr>
                    <p>
                        材料属性全部来自JLkong大佬发在萌新群(481423636)里的《[营火]一岛材料图鉴》，感谢JLkong大佬！<br>
                        材料图标全部来自营火资源包,请勿传播及商用！<br>
                        因为一些批量处理材料属性的方法，可能存在材料的图标或属性错位，可以在群里联系我修改
                    </p>
                </li>
                <li>
                    <hr>
                    <p>
                        属性筛选中的"包含"按钮，用来查找同时拥有多个属性的材料<br>
                        例如你选中物暴击和物暴伤，那么所有同时含有物暴击和物暴伤的材料都会被筛选出来<br>
                    </p>
                </li>
                <li>
                    <hr>
                    <p>
                        技能暂时没有具体数值qaq <br>
                        参考价格为功勋*30，但是具体价值会随稀有度变化，仅供参考
                    </p>
                </li>
                <li>
                    <hr>
                    <p>一些链接：<br>
                        &emsp;主题颜色样式: <a href="https://catppuccin.com/palette/" target="_blank">catppuccin</a><br>
                        &emsp;使用的技术: <a href="https://cn.vuejs.org/" target="_blank">Vue3</a> + <a href="https://getbootstrap.com/" target="_blank">Bootstrap5</a><br>
                        &emsp;营火官方群: <a href="#">366609833</a>(无法分享，自行加入)<br>
                        &emsp;营火萌新群: <a href="https://qm.qq.com/q/6aaB7w4oTK" target="_blank">[营火]萌新组队互助群</a><br>
                        &emsp;作者B站: <a href="https://space.bilibili.com/220675708" target="_blank">@Yamds</a>
                    </p>
                </li>
                <li>
                    <hr>
                    <p>
                        非常好图鉴，💕来自营火<br>
                        @Yamds(Kumiko_chann)
                    </p>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: "Info"
  }
</script>

<script>

</script>

<style scoped>
    h2 {
        margin-bottom: 20px;
    }
    li {
        margin-bottom: 10px;
    }
    li > p {
        font-size: 18px !important;
    }
    a {
        color: var(--ctp-custom);
        font-size: 16px;
    }
    a:hover {
        color: var(--ctp-custom);
    }
</style>