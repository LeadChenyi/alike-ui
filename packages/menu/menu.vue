<template>
    <div class="alike-menu">
        <div class="alike-menu-item-group alike-group--open">
            <div class="alike-submenu-title">导航栏1</div>
            <div class="alike-submenu-menu">
                <div class="alike-menu-item-group">
                    <div class="alike-submenu-title">导航栏1-1</div>
                    <div class="alike-submenu-menu">
                        <div class="alike-menu-item">导航栏1-1-1</div>
                        <div class="alike-menu-item">导航栏1-1-2</div>
                    </div>
                </div>
                <div class="alike-menu-item alike-menu--active">导航栏1-2</div>
                <div class="alike-menu-item">导航栏1-3</div>
            </div>
        </div>
        <div class="alike-menu-item">导航栏3</div>
        <div class="alike-menu-item">导航栏2</div>
    </div>
</template>

<script>
export default {
    name:"alike-nav",
    props:{
        direction:{// 水平horizontal、垂直vertical
            type:String,
            default:"vertical"
        }
    }
}
</script>

<style lang="scss" scoped>
    .alike-menu{width:240px;background-color:#545C64;position:relative;overflow:hidden;}
    .alike-menu-item,.alike-submenu-title{
        height:50px;
        line-height:50px;
        font-size:14px;
        color:#ffffff;
        padding:0 20px;
        cursor:pointer;
        position:relative;
        transition:border-color .3s,background-color .3s,color .3s;
        box-sizing:border-box;
    }
    .alike-menu-item:hover,.alike-submenu-title:hover{
        background-color:#434A50;
    }
    .alike-submenu-menu .alike-menu-item,.alike-submenu-menu .alike-submenu-title{
        height:44px;
        line-height:44px;
        padding:0 20px 0 40px;
    }
    .alike-submenu-menu .alike-submenu-menu .alike-menu-item,.alike-submenu-menu .alike-submenu-menu .alike-submenu-title{
        padding:0 20px 0 60px;
    }
    .alike-menu--active{
        color:$alike-color-primary;
    }
    // .alike-group--open{
    //     transform:rotate(180deg);
    // }
</style>