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
import {addDemo} from '@/api/demo'
import {$iscode} from '@/utils/app'
let defInfo = {
  name: '',
  age: '',
  address: '',
}
export default {
  name: 'AddModal',
  props: {
  },
  data() {
    return {
      layout: {
        labelCol: {
          style:{flex:'0 0 100px'},
        },
        wrapperCol: {
          style:{flex:'auto'},
        }
      },
      visible: false,
      $pro: null,
      title: '',
      info: {},
      loading: false,
    }
  },
  methods: {
    heandleOpen(data) {
      let pro_res, pro_rej;
      this.$pro = new Promise((resolve, reject)=>{
        pro_res = resolve;
        pro_rej = reject;
      });
      this.$pro.pro_res = pro_res;
      this.$pro.pro_rej = pro_rej;

      this.title = data.title;
      this.info = {...defInfo};
      this.visible = true;
      return this.$pro;
    },
    async onOk() {
      this.loading = true;
      try {
        let res = await addDemo(this.info);
        if ($iscode(res, true)){
          this.$pro.pro_res(res.data)
          this.visible = false;
        } else {
          //pass
        }
        this.loading = false;
      }catch(e){
        this.loading = false;
        //pass
      }
    },
    onCancel() {
      if (this.loading) {
        this.$message.warning('请等待加载完成')
        return void 0;
      }
      this.$pro.pro_rej(false)
      this.visible = false;
    }
  }
}
</script>