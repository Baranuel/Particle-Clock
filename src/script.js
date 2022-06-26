import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { TorusGeometry } from 'three'

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded'
}


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// parameters
let tweeks = {
    radius:5,
    innerRing: .3,
    outerRing: .65,
    randomness:0.2,
    randomnessPower :3
}

/**
 * Outer Ring
 */
let ringCount = null
let ringGeometry = null
let ringMaterial = null
let outerRing = null
const ringColors = new Float32Array(ringCount * 3)
const createRing = ()=>{

if (outerRing !== null){
    ringGeometry.dispose()
    ringMaterial.dispose()
    scene.remove(outerRing)
}

      ringCount = 50000
const ringPositions = new Float32Array(ringCount * 3)
const ringColors = new Float32Array(ringCount * 3)
      ringGeometry = new THREE.BufferGeometry()
      ringMaterial = new THREE.PointsMaterial({
    size:.005,
    depthWrite:false,
    vertexColors: true,
    blending:THREE.AdditiveBlending
})
ringGeometry.setAttribute("position", new THREE.BufferAttribute(ringPositions,3))
ringGeometry.setAttribute("color", new THREE.BufferAttribute(ringColors,3))

for(let i = 0; i<ringCount; i++){


    let i3 = i*3
    let ringAngle = (Math.random()) *( Math.PI * 2)
    const innerRadius =  (Math.random()< .5 ? Math.random()*.25 : Math.random()) * tweeks.outerRing + tweeks.innerRing
    const outerRadius =  (Math.random()< .5 ? Math.random()*.75 : Math.random() ) * tweeks.outerRing + tweeks.innerRing
    
    let ringWidth = innerRadius + outerRadius
    const radius = (Math.random() -.5) * tweeks.radius
    const random = (Math.random() - .5) 
  
    ringPositions[i3    ] = Math.cos(ringAngle) * ringWidth + ((Math.random() -.5 )*.15)
    ringPositions[i3 + 1] = (Math.random() -.5) *.2
    ringPositions[i3 + 2] = Math.sin(ringAngle)* ringWidth  + ((Math.random() -.5 )*.15)

    const color = new THREE.Color("#d60f0f")
    const color2 = new THREE.Color("#0b276e")
    const mixedColor = color.clone()

    mixedColor.lerp(color2,ringWidth/1.55)
    ringColors[i3] = mixedColor.r
    ringColors[i3+1] = mixedColor.g
    ringColors[i3+2] = mixedColor.b
}

outerRing = new THREE.Points(ringGeometry, ringMaterial)
outerRing.rotation.x = Math.PI * .5
scene.add(outerRing)
}
createRing()

let hourClock = null
let clockGeometry = null
let clockMaterial = null
let secondsGeometry = null
let minutesGeometry = null
let minutesClock = null
let secondsClock = null


const createClock = ()=>{

    if(hourClock !== null){
        clockGeometry.dispose()
        clockMaterial.dispose()
        secondsGeometry.dispose()
        scene.remove(hourClock)
    }

    clockGeometry = new THREE.BufferGeometry()
    minutesGeometry = new THREE.BufferGeometry()

    secondsGeometry = new THREE.BufferGeometry()
    clockMaterial = new THREE.PointsMaterial({
        vertexColors:true,
        size:.005,
        depthWrite:false,
        blending: THREE.AdditiveBlending,
    })


    const PointsCount = 2000
    const handColor = new Float32Array(5000 * 3)
    const hourClockColor = new Float32Array(10000*3)
    const hourClockPos = new Float32Array(PointsCount * 3)
    clockGeometry.setAttribute("position", new THREE.BufferAttribute(hourClockPos,3))
    clockGeometry.setAttribute("color", new THREE.BufferAttribute(handColor,3))

    const secondsClockPos = new Float32Array(PointsCount * 3)
    secondsGeometry.setAttribute("position", new THREE.BufferAttribute(secondsClockPos,3))
    secondsGeometry.setAttribute("color", new THREE.BufferAttribute(handColor,3))
    const minutesClockPos = new Float32Array(PointsCount *3)
    minutesGeometry.setAttribute("position", new THREE.BufferAttribute(minutesClockPos,3))
    minutesGeometry.setAttribute("color", new THREE.BufferAttribute(handColor,3))
    
    for( let i = 0; i<PointsCount; i++ ){
        let i3 = i*3

        const innerRadius =  (Math.random()< .5 ? Math.random()*.25 : Math.random()) * tweeks.outerRing + tweeks.innerRing
        const outerRadius =  (Math.random()< .5 ? Math.random()*.75 : Math.random() ) * tweeks.outerRing + tweeks.innerRing

        const random = innerRadius + outerRadius

        hourClockPos[i3] =( Math.random() - .5) * .095 
        hourClockPos[i3+1] = Math.random() -.8
        hourClockPos[i3+2] = ( Math.random()) * .1 

        secondsClockPos[i3] =( Math.random() - .5) * .02 
        secondsClockPos[i3+1] = Math.random() -.8
        secondsClockPos[i3+2] = ( Math.random()) * .1 

        minutesClockPos[i3]=( Math.random() - .5) * .05 
        minutesClockPos[i3+1]=( Math.random() ) -.8
        minutesClockPos[i3+2]=( Math.random() ) * .1 

        const color = new THREE.Color("#d60f0f")
        const color2 = new THREE.Color("#0b276e")
        const mixedColor = color.clone()
    
        mixedColor.lerp(color2,random*.35)
        handColor[i3] = mixedColor.r
        handColor[i3+1] = mixedColor.g
        handColor[i3+2] = mixedColor.b



        
    }

    hourClock = new THREE.Points(clockGeometry,clockMaterial)
    secondsClock = new THREE.Points(secondsGeometry,clockMaterial)
    minutesClock = new THREE.Points(minutesGeometry,clockMaterial)
    scene.add(secondsClock)
    scene.add(hourClock)
    scene.add(minutesClock)
}
createClock()

const createMarks = ()=>{

    const pointsCount = 1500
    const marksPos = new Float32Array(pointsCount * 3)
    const marksColors = new Float32Array(pointsCount *3)
    const markGeometry = new THREE.BufferGeometry()
    markGeometry.setAttribute("position", new THREE.BufferAttribute(marksPos,3))
    markGeometry.setAttribute("color", new THREE.BufferAttribute(marksColors,3))
    // markGeometry.setAttribute("color", new THREE.BufferAttribute(ringColors,3))
    clockMaterial = new THREE.PointsMaterial({
        vertexColors:true, 
        size:.01,
        depthWrite:false,
        blending:THREE.AdditiveBlending,
        
    })
    for(let i = 0; i < pointsCount; i++){
        let i3 = i*3
        const innerRadius =  (Math.random()< .5 ? Math.random()*.25 : Math.random()) * tweeks.outerRing + tweeks.innerRing
        const outerRadius =  (Math.random()< .5 ? Math.random()*.55 : Math.random() ) * tweeks.outerRing + tweeks.innerRing

        const colorCombo = innerRadius + outerRadius
        marksPos[i3] = (Math.random() -.5 )*.15
        marksPos[i3+1] = (Math.random() -.5 ) *.4
        marksPos[i3+2] = (Math.random() -.5 )*.01


        const color = new THREE.Color("#a80d02")
        const color2 = new THREE.Color("#0b276e")
        const mixedColor = color2.clone()
    
        mixedColor.lerp(color,Math.random()*marksPos[i3]+.5)
        marksColors[i3] = mixedColor.r
        marksColors[i3+1] = mixedColor.g
        marksColors[i3+2] = mixedColor.b
    }
    for(let m = 0 ; m < 12;m++){
        let hourMark = (m/12 * Math.PI * 2)
        let radius = Math.random()*2 + 2
        const marks = new THREE.Points(markGeometry,clockMaterial)
        marks.position.x = Math.sin(hourMark) * 1.25
        marks.position.y = Math.cos(hourMark) * 1.25
        marks.position.z = .1
        marks.rotation.z = -hourMark

        scene.add(marks)
    }
    
}
createMarks()
//Axes helper functions

//Gui tweeks
// gui.add(tweeks,"innerRing",.4,1.5,.1).onFinishChange(createRing)
// gui.add(tweeks,"outerRing",.05,.5,.1).onFinishChange(createRing)
// gui.add(tweeks,"randomness",0,1.6,.05).onFinishChange(createRing)
// gui.add(tweeks,"randomnessPower",0,10,.05).onFinishChange(createRing)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 10
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const controls = new OrbitControls(camera,renderer.domElement)
console.log(controls)
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Render
    renderer.render(scene, camera)

    //update controls
    controls.update()
    // Animation
     outerRing.rotation.y = elapsedTime * .1
    const date = new Date()

    const hour = date.getHours()
    const hourAngle = hour / 12 * Math.PI *2

    const seconds= date.getSeconds()
    const secondsAngle = seconds/60 * Math.PI *2

    const minutes = date.getMinutes()
    const minutesAngle = minutes/60 * Math.PI * 2

    hourClock.position.set(Math.sin(hourAngle),Math.cos(hourAngle),.1)
    hourClock.rotation.z = -hourAngle 

    secondsClock.position.set(Math.sin(secondsAngle),Math.cos(secondsAngle),.1)
    secondsClock.rotation.z = -secondsAngle

    minutesClock.position.set(Math.sin(minutesAngle),Math.cos(minutesAngle),.1)
    minutesClock.rotation.z = -minutesAngle

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()