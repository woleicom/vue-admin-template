const menu = [
    {
        name: 'Index',
        title: '首页',
        icon: 'HomeOutlined',
    },
    {
        title: 'Test',
        name: 'Test',
        icon: 'BarsOutlined',
        subs: [
            {
                title: 'Test1',
                name: 'Test1',
                icon: '',
            },
            {
                title: 'Test2',
                name: 'Test2',
                icon: '',
                subs: [
                    { title: 'Test21', name: 'Test21', icon: '' },
                    { title: 'Test22', name: 'Test22', icon: '' },
                ]
            }
        ]
    },
    {
        title: 'Demo',
        name: 'Demo1',
        icon: 'BarsOutlined',
        subs: [
            {
                title: 'Demo',
                name: 'Demo',
                icon: '',
                subs: [
                    {
                        title: 'Detail',
                        name: 'Detail',
                        hidden: true
                    }
                ]
            }
        ]
    }
]

module.exports = menu
