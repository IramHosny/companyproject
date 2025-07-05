import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDevis } from "../redux/devisSlice";
import { getarticle } from "../redux/articleSlice";
import { useLocation, useNavigate } from "react-router-dom";

function DemandeDevis() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.user?.user);
  const articlelist = useSelector((state) => state.article.articlelist || []);

  const [form, setForm] = useState({
    typeDemande: "standard",
    nom: "",
    prenom: "",
    societe: "",
    email: "",
    telephone: "",
    dateLivraisonSouhaitee: "",
  });

  const [articles, setArticles] = useState([
    { reference: "", quantite: 1, description: "" }
  ]);

  useEffect(() => {
    dispatch(getarticle());

    const preselected = location.state?.preselectedArticles;
    if (preselected && Array.isArray(preselected)) {
      setArticles(preselected);
    }

    if (user) {
      setForm((prev) => ({
        ...prev,
        nom: user.name || "",
        prenom: user.lastname || "",
        societe: "",
        email: user.email || "",
        telephone: user.phonenumber || "",
      }));
    }
  }, [dispatch, location.state, user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleArticleChange = (index, field, value) => {
    const updated = [...articles];
    updated[index][field] = value;
    setArticles(updated);
  };

  const addArticle = () => {
    setArticles([...articles, { reference: "", quantite: 1, description: "" }]);
  };

  const removeArticle = (index) => {
    const updated = [...articles];
    updated.splice(index, 1);
    setArticles(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addDevis({ ...form, articles }));
      alert("✅ Votre demande a été envoyée avec succès !");
      navigate("/");
    } catch (err) {
      alert("❌ Une erreur est survenue.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 rounded-xl shadow-lg bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <h2 className="text-4xl font-bold text-center text-orange-600 mb-8 animate-pulse">
        🧾 Demande de devis personnalisé
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Infos utilisateur */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-blue-700">Nom :</label>
            <input name="nom" value={form.nom} readOnly className="input bg-gray-100" />
          </div>
          <div>
            <label className="font-bold text-blue-700">Prénom :</label>
            <input name="prenom" value={form.prenom} readOnly className="input bg-gray-100" />
          </div>
        </div>

        <div>
          <label className="font-bold text-blue-700">Société :</label>
          <input
            name="societe"
            placeholder="Tapez le nom de votre société"
            className="input"
            value={form.societe}
            onChange={handleChange}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-blue-700">Email :</label>
            <input name="email" type="email" value={form.email} readOnly className="input bg-gray-100" />
          </div>
          <div>
            <label className="font-bold text-blue-700">Téléphone :</label>
            <input name="telephone" value={form.telephone} readOnly className="input bg-gray-100" />
          </div>
        </div>

        {/* Articles demandés */}
        <fieldset className="border border-blue-200 p-4 rounded-md bg-white shadow-sm">
          <legend className="text-lg font-semibold text-blue-700 px-2">
            📦 Produits demandés
          </legend>

          {articles.map((article, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-4 mt-4">
              <select
                required
                className="input"
                value={article.reference}
                onChange={(e) =>
                  handleArticleChange(index, "reference", e.target.value)
                }
              >
                <option value="">-- Choisir un produit --</option>
                {articlelist
                  .filter((a) => a.categorie === "produit_industriel")
                  .map((a) => (
                    <option key={a._id} value={a.reference}>
                      {a.name} ({a.reference})
                    </option>
                  ))}
              </select>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  required
                  placeholder="Quantité"
                  className="input"
                  value={article.quantite}
                  onChange={(e) =>
                    handleArticleChange(index, "quantite", e.target.value)
                  }
                />
                {articles.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArticle(index)}
                    className="text-red-600 font-bold text-xl"
                  >
                    ✖
                  </button>
                )}
              </div>

              <input
                type="text"
                placeholder="Description du produit"
                className="input mt-2"
                value={article.description}
                onChange={(e) =>
                  handleArticleChange(index, "description", e.target.value)
                }
              />
            </div>
          ))}

          <div className="text-right mt-4">
            <button
              type="button"
              onClick={addArticle}
              className="text-orange-600 font-semibold hover:underline"
            >
              ➕ Ajouter un produit
            </button>
          </div>
        </fieldset>

        <div>
          <label className="font-bold text-blue-700">
            📅 Date de livraison souhaitée :
          </label>
          <input
            name="dateLivraisonSouhaitee"
            type="date"
            required
            className="input"
            onChange={handleChange}
          />
        </div>

        <div className="text-center mt-8">
          <button
            type="submit"
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 font-semibold transition"
          >
            ✅ Envoyer la demande
          </button>
        </div>
      </form>
    </div>
  );
}

export default DemandeDevis;
