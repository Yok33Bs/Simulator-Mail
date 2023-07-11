document.addEventListener('DOMContentLoaded', function(){

    const [form, email, optionalEmail, asunto, mensaje] = [ document.querySelector('#formulario') ,
                                    document.querySelector('#email'),
                                    document.querySelector('#emailscd'),
                                    document.querySelector('#asunto'),
                                    document.querySelector('#mensaje')];

    const [btnEnviar, btnReset, spinner] = [document.querySelector('#formulario button[type="submit"]'),
                                            document.querySelector('#formulario button[type="reset"]'),
                                            document.querySelector('#spinner')];

    const mail = {
        email : '',
        asunto : '',
        mensaje : '',
        
    };

    function cleanMail() {
        for(atribute in mail){
            mail[atribute]='';
        };

        comprobarMail();       
        form.reset()
    }

    form.addEventListener('submit', enviarMail)

    btnReset.addEventListener('click',function(e){
        e.preventDefault();
        cleanMail()
    })
    
    email.addEventListener('input',validar);
    asunto.addEventListener('input',validar);
    mensaje.addEventListener('input',validar);
    optionalEmail.addEventListener('input',function(e){
        borrarAlerta(e.target.parentElement);
        if(e.target.value.trim() !== '') {

            if(mail['email'] !=  e.target.value.trim()){
                if(verificarEmail(e.target.value)){
                    mail['email'] += `, ${e.target.value}` 
                    console.log(mail);
                } else{
                    alertaHTML(e.target.parentElement,'**Email Invalido**');
                };
            }

        };
        return;        
    })

    function validar(e){

        borrarAlerta(e.target.parentElement);

        if(e.target.value.trim() === '') {
        
            mail[e.target.id] = '';
            alertaHTML(e.target.parentElement,'**Campo obligatorio**');
            return;
        };
        
        if(e.target.id == 'email') {
            if(verificarEmail(e.target.value)){
                optionalEmail.disabled = false;
                
            }else {
                optionalEmail.disabled = true;
                mail[e.target.id] = '';
                alertaHTML(e.target.parentElement,'**Email Invalido**');
                return
            }

        };

        mail[e.target.id] = e.target.value.trim();
        comprobarMail();
    };

    function alertaHTML(element,mensaje) {

        borrarAlerta(element);

        const msg = document.createElement('p');
        msg.textContent = mensaje;
        msg.classList.add('err','p-3','text-center');

        element.appendChild(msg);
        comprobarMail();
    };

    function borrarAlerta(element) {
        
        const alerta = element.querySelector('.err');
        if(alerta) alerta.remove();
    };

    function verificarEmail(email) {
        
        return (/^.\S+@.\S+\.\w{2,3}$/.test(email))
    };

    function comprobarMail() {
        if(Object.values(mail).includes('')){
            btnEnviar.classList.add('opacity-50');
            btnEnviar.disabled = true;
            return;
        };

        btnEnviar.classList.remove('opacity-50');
        btnEnviar.disabled = false;
    };

    function enviarMail(e) {
        e.preventDefault();
        
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(()=>{
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            
            cleanMail()

            const alertExito = document.createElement('p');
            alertExito.classList.add('bg-green-500','text-white','p-2','text-center','rounded-lg','mt-10','font-bold','uppercase','text-sm');
            alertExito.textContent = 'Mensaje enviado exitosamente';
            form.appendChild(alertExito);

            setTimeout(()=>{
                alertExito.remove()
            },2000)
        },3000)
    }
});