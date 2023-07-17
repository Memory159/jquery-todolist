$(function() {
    // 按下回车 把完整的数据 存储到本地存储里面
    // 存储的数据格式 var todolist = [{title : "xxx", done : false}]
    load();
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入内容");
            } else {
                // 先读取本地存储原来的数据
                var local = getDate();
                // 把 local 数组进行更新数据 把最新的数据追加给 local 数组
                local.push({ title: $(this).val(), done: false });
                // 把这个数组 local  存储给本地存储  传递参数是为了把 local 传递给函数
                saveDate(local);
                // toDoList 本地存储数据渲染加载到页面
                load();
                $(this).val("");
            }
        }
    });

    // toDoList 正在进行和已经完成选项操作
    $("ol, ul").on("click", "input", function() {
        // 先获取本地存储的数据
        var data = getDate();
        // 修改数据
        var index = $(this).siblings("a").attr("id"); // 获取到表单的兄弟的索引值  attr() 是自定义属性
        data[index].done = $(this).prop("checked"); // 数组的 done 属性设置为选定状态  peop() 是固有属性
        // 保存到本地存储
        saveDate(data);
        // 重新渲染页面
        load();
    })

    // 删除操作
    $("ol, ul").on("click", "a", function() {
        // 获取本地存储
        var data = getDate();
        // 修改数据
        var index = $(this).attr("id"); // 获取每条数据的索引
        data.splice(index, 1); // 删除本条数据
        // 保存到本地存储
        saveDate(data); // 把修改完的数据再存储到本地 
        // 重新渲染页面
        load();
    })

    // 读取本地存储的数据
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            // 本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    // 保存本地存储数据
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    // 渲染加载数据
    function load() {
        // 读取本地存储的数据
        var data = getDate();
        // 遍历之前先要清空 ul ol 里面的元素内容 
        $("ol,ul").empty();
        var todoCount = 0; // 正在进行的个数
        var doneCount = 0; // 已经完成的个数
        // 遍历这个数据
        $.each(data, function(i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type = 'checkbox' checked = 'checked'> <p>" + n.title + "</p> <a href = 'javascript:;' id = " + i + "></a></li>")
                doneCount++;
            } else {
                $("ol").prepend("<li><input type = 'checkbox'> <p>" + n.title + "</p> <a href = 'javascript:;' id =  " + i + " ></a></li>")
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
})