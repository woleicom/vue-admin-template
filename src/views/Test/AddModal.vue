<template>
  <!-- 不设置居中，否则min-width无效 -->
  <a-modal
    v-model:visible='visible'
    width='60%'
    :maskClosable='false'
    :title='title'
    okText=''
    :style="{minWidth:'300px'}"
    :centered='false'
    :footer='null' 
  >
    <a-form
      v-bind='layout'
      ref='form'
      name='basic'
      :model='info'
      @finish='onOk'
    >
      <a-form-item
        class="form-item"
        label='姓名' name="name"
        :rules="[{ required: true, message: '请输入姓名' }]"
      >
        <a-input v-model:value='info.name'></a-input>
      </a-form-item>
      <a-form-item
        class="form-item"
        label='年龄' name="age"
        :rules="[{ required: true, message: '请输入年龄' }]"
      >
        <a-input v-model:value='info.age'></a-input>
      </a-form-item>
      <a-form-item
        class="form-item"
        label='地址' name="address"
        :rules="[{ required: true, message: '请输入地址' }]"
      >
        <a-input v-model:value='info.address'></a-input>
      </a-form-item>
      <a-form-item
        class="form-item"
        label='内联布局' :style="{ marginBottom: 0 }"
      >
        <a-form-item
          name="year"
          :style="{ display: 'inline-block', width: 'calc(50% - 8px)' }"
        >
          <a-input placeholder="测试内敛1"></a-input>
        </a-form-item>
        <a-form-item
          name="month"
          :style="{ display: 'inline-block', width: '50%', margin: '0 0 0 8px' }"
        >
          <a-input placeholder="测试内敛2"></a-input>
        </a-form-item>
        <a-form-item :style="{textAlign: 'right'}">
          <a-button :style="{marginRight: '10px'}" @click='onCancel'>取消</a-button>
          <a-button type='primary' :loading='loading' htmlType='submit'>确定</a-button>
        </a-form-item>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<style lang="less" scoped>
.form-item{
  display: flex;
}
</style>
<script>
import {ref} from 'vue'
import {addDemo} from '@/api/demo'
import {$iscode} from '@/utils/app'
import {message} from 'ant-design-vue'
let defInfo = {
  name: '',
  age: '',
  address: '',
}
export default {
  name: 'AddModal',
  setup(props,context) {
    let layout = {
      labelCol: {
        style:{flex:'0 0 100px'},
      },
      wrapperCol: {
        style:{flex:'auto'},
      }
    }
    let visible = ref(false);
    let title = ref('');
    let info = ref({...defInfo});
    let loading = ref(false);
    let $pro;

    let heandleOpen = (data) => {
      let pro_res, pro_rej;
      $pro = new Promise((resolve, reject)=>{
        pro_res = resolve;
        pro_rej = reject;
      });
      $pro.pro_res = pro_res;
      $pro.pro_rej = pro_rej;

      title.value = data.title;
      info.value = {...defInfo};
      visible.value = true;
      return $pro;
    }
    let onOk =async() => {
      loading.value = true;
      try {
        let res = await addDemo(info.value);
        if ($iscode(res, true)){
          $pro.pro_res(res.data)
          visible.value = false;
        } else {
          //pass
        }
        loading.value = false;
      }catch(e){
        loading.value = false;
        //pass
      }
    }
    let onCancel = () => {
      if (loading.value) {
        message.warning('请等待加载完成')
        return void 0;
      }
      $pro.pro_rej(false)
      visible.value = false;
    }
    return {
      layout,
      visible,
      title,
      info,
      loading,
      heandleOpen,
      onOk,
      onCancel
    }
  }
}
</script>