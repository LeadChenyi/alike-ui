export default class Code {
    constructor(canvas){
        this.code = null;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.init();
    }

    init(){
        this.draw();
    }

    draw(){
        // 先清空画布
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        // 再绘制画布
        this.code = this.getRandomCharacter();
        this.ctx.font = "38px bold sans-serif";
        this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = "#ff5858";
		this.ctx.fillText(this.code.join(' '), this.canvas.width / 2, this.canvas.height / 2);
    }

    getRandomCharacter(isRandom = false,min = 4,max = 6){// 随机获取字母数字组合
        let codes = [];
        let range = min;
        let characters = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l','m', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L','M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
        ];

        if(isRandom){
            range = parseInt(Math.random() * (max - min + 1) + min);
        }
        
        for(let i = 0;i < range;i++){
            let tempIndex = Math.floor(Math.random() * characters.length);
            codes.push(characters[tempIndex]);
        }

        return codes
    }

    getRGBA(min = 0.5){
        let r = Math.ceil(Math.random() * 255);
        let g = Math.ceil(Math.random() * 255);    
        let b = Math.ceil(Math.random() * 255);
        let a = parseFloat(Math.random() * 1 + min).toFixed(2);
        return `rgba(${r},${g},${b},${a});`
    }
    
    getColor1(){
        let color = "#";
        for(let i = 0;i < 6;i++){
            color += (Math.random()*16 | 0).toString(16);
        }
        return color;
    }
    
    getColor2(){
        let colors = ["#"];
        let characters = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
        for(let i = 0; i < 6;i++){
            let tempIndex = Math.floor(Math.random() * characters.length);
            colors.push(characters[tempIndex]);
        }
        return colors;
    }
}