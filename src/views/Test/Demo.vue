<template>
  <a-layout class='index animated fadeIn'>
    <a-card>
      <div :style="{'textAlign':'right'}">
        <a-button type="danger" @click='actionAddModel'>添加</a-button>
      </div>
      <a-form
        ref='form'
        :model='search'
        :style="{'marginBottom':'10px'}"
        :initialValues="search"
        :onFinish='pageSearchChange'
        layout='inline'
      >
        <a-form-item label="筛选项1" name='name1'>
          <a-input v-model:value="search.name1" :style="{width:'180px'}" placeholder="测试输入框"></a-input>
        </a-form-item>
        <a-form-item label="筛选项2" name='name2'>
          <a-input v-model:value="search.name2" :style="{width:'180px'}" placeholder="测试输入框"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" htmlType='submit'>搜索</a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="default" @click='pageSearchReset'>重置</a-button>
        </a-form-item>
      </a-form>
      <HTable
        :width='2000'
        :pagination='false' 
        :loading='listLoading'
        bordered
        rowKey='id' 
        :columns='columns' 
        :data-source='data'></HTable>
      <HPage
        :current="search.page" 
        :page-size="search.size" 
        :total="total" 
        @change="pageCurrentChange" 
        @showSizeChange="pageSizeChange" />
    </a-card>
    <add-modal ref='AddModal'></add-modal>
  </a-layout>
</template>
<script>
import {ref,onMounted} from 'vue';
import {message} from 'ant-design-vue'
import {getRouter} from '@/utils/app'
import {setPageState,getPageState} from '@/utils/pageState'
import {getList} from '@/api/demo'
import {$iscode} from '@/utils/app'
import AddModal from './AddModal.vue'
import HTable from '@/components/HTable'
import HPage from '@/components/HPage'
// 初始化默认筛选项数值
let defSearch = {
  name1: '',
  name2:'',
  page: 1,
  size: 10
}
export default {
  name: 'Demo',
  components: {
    AddModal,
    HTable,
    HPage
  },
  setup(props) {
    const AddModal = ref(null)
    // // 初始化 分页信息和筛选项信息
    let total = ref(0);
    let search = ref({...defSearch});
    // 列表数据和列头配置
    let data = ref([])
    let listLoading = ref(false);
    let columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '操作',
        key: 'action',
        customRender: function (text, record) {
          return (
            <span>
              <a-button type="link" onClick={pageLinkChange} block>详情</a-button>
            </span>
          )
        },
      },
    ]
    // 页面跳转
    const pageLinkChange = () => {
      setPageState(getRouter().route.path,{...search.value})
      getRouter().router.push('/demo/demo/detail');
    }
    // 页面筛选项搜索
    const pageSearchChange = () => {
      search.value = {...search.value, page: 1}
      initData(search.value);
    }
    // 页面筛选项重置
    const pageSearchReset = () => {
      search.value = {...defSearch, page: search.value.page, size: search.value.size}
    }
    // 分页当前页切换
    const pageCurrentChange = (page, pageSize) => {
      search.value.page = page;
      initData(search.value);
    }
    // 分页当前页显示多少条切换
    const pageSizeChange = (current, size) => {
      search.value.page = 1;
      search.value.size = size;
      initData(search.value);
    }
    const actionAddModel = () => {
      AddModal.value.heandleOpen({title: '添加'}).then((res)=>{
        data.value = [res,...data.value.slice(0,-1)]
      },()=>{})
    }

    const initData = async (values) => {
      listLoading.value = true;
      try {
        let res = await getList(values);
        listLoading.value = false;
        if ($iscode(res)) {
          data.value = res.data;
          total.value = res.total;
        } else {
          message.error(res.message)
        }
      } catch (e) {
        listLoading.value = false;
      }
    }

    onMounted(() => {
      // 查看是否有留存状态，有则替换
      let pageState = getPageState(getRouter().route.path);
      if(pageState) {
        search.value = Object.assign(search.value, pageState);
      }
      initData(search.value);
    })
    return {
      total,
      search,
      data,
      listLoading,
      columns,
      pageLinkChange,
      pageSearchChange,
      pageSearchReset,
      pageCurrentChange,
      pageSizeChange,
      actionAddModel
    }
  }
}
</script>