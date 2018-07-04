//下面是二叉树的构造函数
//三个参数分别是左树，当前节点，右树
function Tree(left, label, right) {
    this.left = left;
    this.label = label;
    this.right = right;
}

//下面是中序(inorder)遍历函数
//由于返回的是一个遍历器，所以要用generator函数
//函数体内采用递归算法，所以左树和右树要用yield* 遍历
function* inorder(t){
    if(t) {
        yield* inorder(t.left);
        yield t.label;
        yield* inorder(t.right);
    }
}

//生成二叉树
function make(array) {
    //判断是否是叶子节点
    if(array.length == 1) {
        return new Tree(null , array[0], null);
    }else {
        return new Tree(make(array[0]), array[1], make(array[2]));
    }
}

let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

var result = [];
for(let node of inorder(tree)) {
    result.push(node);
}