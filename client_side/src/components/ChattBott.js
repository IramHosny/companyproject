import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { FaComments } from 'react-icons/fa';

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
  {
    id: '0',
    message: "Bonjour ! Que souhaitez-vous savoir ?",
    trigger: 'menu',
  },
  {
    id: 'menu',
    options: [
      { value: 'produits', label: "Quels produits proposez-vous ?", trigger: '1' },
      { value: 'commande', label: "Comment passer une commande ?", trigger: '2' },
      { value: 'devis', label: "Comment demander un devis ?", trigger: '3' },
      { value: 'personnalisation', label: "Puis-je personnaliser un produit ?", trigger: '4' },
      { value: 'suivi', label: "Suivi de commande", trigger: '5' },
      { value: 'contact', label: "Contacter la société", trigger: '6' },
    ],
  },
  {
    id: '1',
    message: "Nous proposons une variété de produits métalliques : portes, tables, chaises, articles décoratfis, etc.",
    trigger: 'menu',
  },
  {
    id: '2',
    component: (
      <div>
        <p>Choisissez un produit, cliquez sur 'Ajouter au panier' et remplissez le formulaire.</p>
        <a
          href="/articles"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          🛒 Commander maintenant
        </a>
      </div>
    ),
    trigger: 'menu',
  },
  {
    id: '3',
    component: (
      <div>
        <p>Pour recevoir un devis, allez dans la section Services puis cliquez sur "Demande de devis".</p>
        <a
          href="/service"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          📄 Demander un devis
        </a>
      </div>
    ),
    trigger: 'menu',
  },
 {
  id: '4',
  component: (
    <div>
      <p>Oui, vous pouvez personnaliser les dimensions, couleurs ou matériaux selon vos besoins.</p>
      <a
        href="/service"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        ✍️ Envoyer une demande personnalisée
      </a>
    </div>
  ),
  trigger: 'menu',
},
 {
  id: '5',
  component: (
    <div>
      <p>Vous pouvez suivre l'état de votre commande depuis le menu <strong>"Commandes"</strong> dans la barre de navigation.</p>
      <p>✅ Une notification vous sera également envoyée par email dès que le statut de votre commande change.</p>
    </div>
  ),
  trigger: 'menu',
},
  {
    id: '6',
    component: (
      <div>
        <p>Vous pouvez nous contacter via la page Contact ou par téléphone.</p>
        <a
          href="/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          📬 Aller à la page Contact
        </a>
      </div>
    ),
    trigger: 'menu',
  }
];

export default function ChatBott() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
        title="Discuter avec Binomy"
      >
        <FaComments size={24} />
      </button>

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
