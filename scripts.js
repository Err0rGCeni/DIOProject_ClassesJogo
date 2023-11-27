const CLASSMAP = {
    mage: {
        name: "Mágico",
        weapon: "magia"
    },
    warrior: {
        name: "Guerreiro",
        weapon: "espada"
    },
    monk: {
        name: "Monge",
        weapon: "artes marciais"
    },
    ninja: {
        name: "Ninja",
        weapon: "shuriken"
    }
}

const hero = {
    nome: "",
    idade: 0,
    tipo: {
        name: "Iniciante",
        weapon: "amizade"
    }
}

const title = document.getElementById('title-text');
const leftPupil = document.getElementById('left-pupil');
const rightPupil = document.getElementById('right-pupil');
const head = document.querySelector('.head');
const nameInput = document.getElementById('input-name')
const ageInput = document.getElementById('input-age')
const classInput = document.getElementById('input-class')
const background = document.getElementById('background')

window.addEventListener('mousemove', function (event) {
    const headRect = head.getBoundingClientRect();
    const headCenterX = headRect.left + headRect.width / 2;
    const headCenterY = headRect.top + headRect.height / 2;

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const deltaX = mouseX - headCenterX;
    const deltaY = mouseY - headCenterY;

    const angle = Math.atan2(deltaY, deltaX);
    const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), headRect.width / 3); // Limit eye movement within a certain radius

    const eyeOffsetX = Math.cos(angle) * distance * 0.25;
    const eyeOffsetY = Math.sin(angle) * distance * 0.25;

    leftPupil.style.transform = `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`;
    rightPupil.style.transform = `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`;
});

function checkOverflow() {
    if (title.scrollWidth > title.clientWidth) {
        title.classList.add("overflow-on")
    } else {
        title.classList.remove("overflow-on")
    }
}

function handleUpdate() {
    background.classList.remove("mage", "warrior", "monk", "ninja")
    hero.nome = nameInput.value
    hero.idade = Number(ageInput.value)
    hero.tipo = CLASSMAP[classInput.value]
    title.textContent = `${nameInput.value} (${ageInput.value}), o ${CLASSMAP[classInput.value].name}`
    checkOverflow()
    background.classList.add(classInput.value)    
}

function handleAttack() {
    const msg = document.createElement("p")
    msg.textContent = `O ${hero.tipo.name}  atacou usando ${hero.tipo.weapon}`
    msg.className = "msg"
    document.body.appendChild(msg)
    setTimeout(()=>{
        document.body.removeChild(msg)
    }, 5000)
}
