import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Cal from '/assets/calendar.jpg'
import Divider from '@mui/material/Divider';
function About() {
  return (
    <div className="font-body text-white flex flex-col min-h-screen bg-gray-900">
        <Navbar/>
        <div className='flex items-center justify-center px-8 py-4'>
        <div className='w-2/3 text-gray-300 px-4'>
          <div className='flex items-center justify-around px-8 py-4'>
            <h1 className='lg:text-2xl text-xl font-bold font-body text-white'>
              A propos de l'application
            </h1>
          </div>
          <p className=' sm:text-lg text-base mt-4'>
            Nous comprenons les défis des étudiants dans la gestion de leur emploi du temps, surtout pendant les périodes d'examen. Notre application de calendrier d'examens simplifie ce processus stressant, créée par une équipe d'étudiants qui ont vécu ces défis. En fournissant une plateforme centrale, nous améliorons la communication et la collaboration entre étudiants et enseignants, facilitant l'accès aux détails des examens.
          </p>
          <p className=' sm:text-lg text-base mt-4'>
            Nous croyons au pouvoir de la technologie pour rendre les périodes d'examen moins stressantes, et cette application incarne notre engagement envers cette cause.
          </p>
        </div>
        <img src={Cal} alt='about' className='w-1/4 lg:w-1/3 rounded-lg' />
      </div>
      <div className=' px-28 '>
        <Divider orientation="horizontal" variant="middle" flexItem style={{backgroundColor: 'white'}}/>
      </div>
      <div className='flex items-center justify-center px-8 py-4 '>
        <div className='w-2/3 text-gray-300 px-4'>
          <div className='flex items-center justify-around px-8 py-4'>
            <h1 className='lg:text-2xl text-xl font-bold font-body text-white'>
              Contactez-nous
            </h1>
          </div>
          <p className=' sm:text-lg text-base mt-4'>
          Nous nous efforçons de créer une expérience conviviale et efficace pour la programmation des examens. Essayez notre application dès aujourd'hui ! Si vous avez des questions ou des commentaires, n'hésitez pas à utiliser notre formulaire de contact. Votre contribution est précieuse pour nous permettre d'améliorer continuellement cette plateforme.
          </p>
        </div>
            <form className='w-1/2 mt-4 rounded-xl bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 px-8 pt-6 pb-8'>
              <div className='mb-4'>
                <label className='block text-gray-300 text-sm font-bold mb-2' htmlFor='email'>
                  E-mail
                </label>
                <input className='shadow bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='email' type='email' placeholder='Email' />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-300 text-sm font-bold mb-2' htmlFor='message'>
                  Message
                </label>
                <textarea className='shadow appearance-none bg-gray-200 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='message' placeholder='Message' rows='5'></textarea>
              </div>
              <div className='flex items-center justify-center'>
                <button className='w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' type='submit'>
                  Envoyer
                </button>
              </div>
            </form>
      </div>
        <Footer/>
    </div>
  )
}

export default About