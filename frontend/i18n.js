// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  fr: {
    translation: {
      home: "Accueil",
      createPost: "Créer une annonce",
      profile: "Profil",
      logout: "Déconnexion",
      login: "Connexion",
      register: "Inscription",
      name: "Nom",
      email: "Email",
      password: "Mot de passe",
      emailPlaceholder: "Entrez votre email",
      passwordPlaceholder: "Entrez votre mot de passe",
      namePlaceholder: "Entrez votre nom", // Added name placeholder
      title: "Titre",
      description: "Description",
      location: "Emplacement",
      whatsappNumber: "Numéro WhatsApp",
      images: "Images",
      maxImages: "(maximum 5 images)",
      submitPost: "Soumettre le Post",
      titleRequired: "Le titre est requis",
      descriptionRequired: "La description est requise",
      locationRequired: "L'emplacement est requis",
      whatsappRequired: "Le numéro WhatsApp est requis",
      imageRequired: "Au moins une image est requise",
      maxImagesError: "Vous ne pouvez pas télécharger plus de 5 images.",
      postCreated: "Post Créé ✅",
      postSuccessMessage: "Votre post a été créé avec succès !",
      backToHome: "Retour à l'accueil",
      selectLocation: "Sélectionner un emplacement",
      whatsappPlaceholder: "Numéro WhatsApp",
      descriptionPlaceholder: "Entrez une description",
      titlePlaceholder: "Entrez le titre de votre post",
      postError: "Erreur lors de la création du post. Veuillez réessayer.",
      // Profile Page Translations
      welcome: "Bienvenue",
      user: "Utilisateur",
      yourPosts: "Voici vos publications",
      delete: "Supprimer",
      loading: "Chargement...",
      noPosts: "Aucune publication trouvée. Créez votre première publication dès maintenant !",
      previous: "Précédent",
      next: "Suivant",
    },
  },
  ar: {
    translation: {
      home: "الصفحة الرئيسية",
      createPost: "إنشاء إعلان",
      profile: "الملف الشخصي",
      logout: "تسجيل الخروج",
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      name: "الاسم",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      passwordPlaceholder: "أدخل كلمة المرور",
      namePlaceholder: "أدخل اسمك", // Added name placeholder in Arabic
      title: "العنوان",
      description: "الوصف",
      location: "الموقع",
      whatsappNumber: "رقم واتساب",
      images: "الصور",
      maxImages: "(الحد الأقصى 5 صور)",
      submitPost: "إرسال الإعلان",
      titleRequired: "العنوان مطلوب",
      descriptionRequired: "الوصف مطلوب",
      locationRequired: "الموقع مطلوب",
      whatsappRequired: "رقم واتساب مطلوب",
      imageRequired: "تحتاج إلى إضافة صورة واحدة على الأقل",
      maxImagesError: "لا يمكنك تحميل أكثر من 5 صور.",
      postCreated: "تم إنشاء الإعلان ✅",
      postSuccessMessage: "تم إنشاء إعلانك بنجاح!",
      backToHome: "الرجوع إلى الصفحة الرئيسية",
      selectLocation: "اختر الموقع",
      whatsappPlaceholder: "رقم واتساب",
      descriptionPlaceholder: "أدخل الوصف",
      titlePlaceholder: "أدخل عنوان الإعلان",
      postError: "حدث خطأ أثناء إنشاء الإعلان. يرجى المحاولة مرة أخرى.",
      // Profile Page Translations
      welcome: "أهلاً وسهلاً",
      user: "مستخدم",
      yourPosts: "هذه هي منشوراتك",
      delete: "حذف",
      loading: "جارٍ التحميل...",
      noPosts: "لا توجد منشورات. قم بإنشاء منشورك الأول الآن!",
      previous: "السابق",
      next: "التالي",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr', // default language
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;

