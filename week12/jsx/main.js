import { Component, createElement } from "./framework"

class Carousel extends Component{
    constructor(){
        super()
    }
    render() {
        return document.createElement('div')
    }
}

let a = <Carousel />

a.mountTo(document.body)