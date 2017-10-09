<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
    
                    <div class="modal-header">
                        <slot name="header">
    
                        </slot>
                        <button type="button" class="close" @click="$emit('close')">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
    
                    <div class="modal-body">
                        <slot name="body">
                            default body
                        </slot>
                    </div>
    
                    <div class="modal-footer">
                        <slot name="footer">
                            <button type="button" class="btn btn-default" @click="$emit('close')">
                                OK
                            </button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'Modal',
    data() {
        return {

        }
    },
    props: {

    },
    methods: {

    },
    mounted() {

    }
}
</script>
<style scoped>
.close {
    position: absolute;
    right: 30px;
    top: 30px;
}

.modal-mask {
    position: fixed;
    z-index: 10001;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
}

.modal-wrapper {
    position: absolute;
    width: 100%;
    height: 1px;
    left: 0;
    right:0;
    top: 120px;
}

.modal-container {
    width: 600px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    position: relative;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-default-button {
    float: right;
}

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
