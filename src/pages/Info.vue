<template>
    <div>
        <h2>网站说明书</h2>
        <div class="row">
            <div class="col-md-8">
                <ul>
                    <li>
                        <hr>
                        <p>
                            这是我的 Vue 3 练习项目，一个为 Minecraft RPG 服务器 《营火（Foacraft）》
                            打造的材料图鉴查询网站。作为前端开发的纯新手，我搭建这个网站的目的是方便玩家快速查询游戏内的材料及其详细信息。如果大佬们发现任何问题或有改进建议，欢迎随时指出！你们的反馈对我来说非常宝贵，我会继续努力学习并提升自己的技能。
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
                        <p>一些链接：<br>
                            &emsp;主题颜色样式: <a href="https://catppuccin.com/palette/" target="_blank">catppuccin</a><br>
                            &emsp;使用的技术: <a href="https://cn.vuejs.org/" target="_blank">Vue3</a> + <a
                                href="https://getbootstrap.com/" target="_blank">Bootstrap5</a><span>(布局)</span> + <a
                                href="https://element-plus.org/zh-CN/#/zh-CN"
                                target="_blank">Element-ui</a><span>(菜单)</span><br>
                            &emsp;营火官方群: <a href="#" style="pointer-events:none;">366609833</a>(无法分享，自行加入)<br>
                            &emsp;营火萌新群: <a href="https://qm.qq.com/q/6aaB7w4oTK" target="_blank">[营火]萌新组队互助群</a><br>
                            &emsp;本项目的地址: <a href="https://github.com/Yamds/yamds.github.io"
                                target="_blank">yamds.github.io</a><span
                                style="color: var(--ctp-overlay2);">欢迎点个starqaq</span><br>
                            &emsp;作者B站: <a href="https://space.bilibili.com/220675708" target="_blank">@Yamds</a>
                        </p>
                    </li>
                    <li>
                        <hr>
                        <p>
                            非常好图鉴，💕来自营火<br>
                            @Yamds(Kumiko_chann)
                        </p>
                        <hr>
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

li>p {
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