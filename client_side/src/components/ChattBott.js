import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { FaComments } from 'react-icons/fa'; // icône

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#2563EB',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#2563EB',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const steps = [
  { id: '0', message: "Bonjour ! Quel est votre prénom ?", trigger: '1' },
  { id: '1', user: true, trigger: '2' },
  { id: '2', message: "Enchanté, {previousValue} ! Comment puis-je vous aider ?", trigger: '3' },
  {
    id: '3',
   options: [
  { value: 'admin', label: "Je veux contacter la société", trigger: '4' },
  { value: 'commande', label: "Comment passer une commande ?", trigger: '5' },
  { value: 'devis', label: "Comment recevoir un devis ?", trigger: '6' },
  { value: 'produits', label: "Quels types de produits proposez-vous ?", trigger: '7' },
  { value: 'personnalisation', label: "Puis-je personnaliser un produit ?", trigger: '8' },
  { value: 'suivi', label: "Puis-je suivre l'état de ma commande ?", trigger: '9' },
]
  },
  {
  id: '4',
  message: "Vous pouvez nous contacter via la page Contact ou par téléphone pour toute demande.",
  end: true
},
{
  id: '5',
  message: "Choisissez un produit, cliquez sur 'Commander' et remplissez le formulaire de commande.",
  end: true
},
{
  id: '6',
  message: "Ajoutez les produits à votre commande puis cliquez sur 'Demander un devis'. Vous recevrez une réponse sous 48h.",
  end: true
},
{
  id: '7',
  message: "Nous proposons une variété de produits métalliques : portes, tables, chaises, étagères, etc.",
  end: true
},
{
  id: '8',
  message: "Oui, vous pouvez personnaliser les dimensions, couleurs ou matériaux selon vos besoins.",
  end: true
},
{
  id: '9',
  message: "Oui, un suivi de commande est disponible dans votre espace client après la validation de votre commande.",
  end: true
}
];

export default function ChatBott() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
        title="Discuter avec Binomy"
      >
        <FaComments size={24} />
      </button>

      {/* Fenêtre du chatbot */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-[320px] shadow-xl">
          <ThemeProvider theme={theme}>
            <ChatBot steps={steps} floating={false} />
          </ThemeProvider>
        </div>
      )}
    </>
  );
}
