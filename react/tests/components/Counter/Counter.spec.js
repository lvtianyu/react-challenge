import React from 'react'
import { bindActionCreators } from 'redux'
import { Counter } from 'routes/FinishShow/components/FinishShow'
import { shallow } from 'enzyme'

describe("example",function () {
     function a(value){
        value=(typeof value)=="number"?value*2:0
         return value
     }
     it("value must is number",function () {
        expect(a(2)).to.be.true
     })
})

describe("a suite",function(){
    it("contains spec with an expectation",function(){
        expect(true).to.be.true
    })
    it("equal",function () {
        expect("hello").to.equal("hello")
    })
    var a=1;
    it("not equal",function(){
        expect(a).to.equal(1)
    })
    it("empty",function () {
        expect([]).to.be.empty
    })
    it("false",function(){
        expect(false).to.be.false;
    })
    it("null",function(){
        expect(null).to.be.null
    })
    it("exist",function(){
        var foo='hi',
        bar=null,
        baz;
        expect(baz).to.exist
    })
    it("eql",function(){
        expect({foo:'bar'}).to.eql({foo:'bar'})
    })
    var arr=["2","1","3","4","5"]
    it("value",function(){
        
        expect(arr.length).to.be.above(5)
    })
    it("foo",function(){
        expect("foo").to.have.length.of.at.most(4)
    })
    it("property",function(){
    var obj={foo:"bar"}
    expect(obj).to.have.property("foo")
    })

    var deepObj={
        green:{tea:'matcha'},
        teas:["chai","matcha",{tea:"konacha"}]
    }
    it("property",function(){
        expect(deepObj).to.have.deep.property("green.tea",'matcha')
        expect(deepObj).to.have.deep.property("teas[1]","matcha")
    })
    it("match",function(){
        expect('foobar').to.match(/^foo/)
    })
    it("key",function(){
        expect({foo:1,bar:2,baz:3}).to.have.any.keys("foo","bar")

    })
    it("throw",function(){
        var err =new RefernceError("this is a bad function")
        var fn=function(){throw err}
        expect(fn).to.throw(ReferenceError)
        expect(fn).to.throw(Error)
        expect(fn).to.throw(/bad function/)
    })
    it("respondTo(method)",function(){
        expect([1,2,3]).to.include.members([3,2])
        expect([4,2]).to.have.members([2,4])
    })
    it("oneOf",function(){
        expect("a").to.be.oneOf(["a","v","c"])
        expect([3]).to.not.be.oneOf([1,2,[3]])
    })
    it("change",function(){
        var obj={val:10}
        var fn=function(){obj.val+=3}
        var noChangeFn=function(){
            return "bar"+"baz"
        }
        expect(fn).to.change(obj,"val")
    })
    it("increase",function(){
        var obj={val:10}
        var fn=function(){obj.val=15}
        expect(fn).to.increase(obj,val)
    })

    it("frozen",function(){
        var frozenObject=Object.freeze({})
        expect(frozenObject).to.be.frozen
        expect({}).to.not.be.frozen
    })
})

