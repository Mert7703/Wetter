<!-- 
  Diese Vue.js-Komponente repräsentiert den Header der Anwendung, der eine Navigationsleiste enthält.
  Das Erscheinungsbild ändert sich abhängig von der Scroll-Position und der Bildschirmbreite.
-->
<template>
    <header :class="{ 'scrolled-nav': scrollPosition > 0 }">
      <!-- Navigationsleiste mit Branding und mobiler Navigationsschaltfläche -->
      <nav>
        <div class="branding">
          <!-- Logo-Bild mit dynamischem Pfad -->
          <img :src="require('@/assets/AppLogo.jpg')" alt="Logo" class="logo">
          <!-- Schaltfläche für mobile Navigation -->
          <div class="icon" role="button" aria-label="Toggle Mobile Navigation" @click="toggleMobileNav">
            <!-- Mobiles Navigationsmenü-Symbol (Burger-Icon) -->
            <i v-show="mobile" class="fas fa-bars" :class="{'icon-active': mobileNav}"></i>
          </div>
        </div>
        
        <!-- Navigationsmenü mit Transition -->
        <transition name="expand">
          <!-- Versteckte Liste für mobile Navigation oder bei deaktiviertem mobileNav -->
          <ul v-show="!mobile || mobileNav" :class="{ navigation: true, 'expanded-nav': mobileNav }">
            <!-- Navigationslinks zu verschiedenen Routen -->
            <li><router-link class="link" :to="{ name: 'myWeather' }">myWeather</router-link></li>
            <li><router-link class="link" :to="{ name: 'About' }">About</router-link></li>
            <li><router-link class="link" :to="{ name: '' }">name</router-link></li>
            <li><router-link class="link" :to="{ name: '' }">contact</router-link></li>
          </ul>
        </transition>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'navigation',
    data() {
      // Daten für die Komponente: scrollPosition, mobile, mobileNav, windowWidth
      return {
        scrollPosition: null,  // Scroll-Position der Seite
        mobile: true,          // Flag für mobile Ansicht
        mobileNav: false,      // Flag für mobiles Navigationsmenü
        windowWidth: null,     // Breite des Browserfensters
      };
    },
    methods: {
      // Methode zum Umschalten des mobilen Navigationsmenüs
      toggleMobileNav() {
        this.mobileNav = !this.mobileNav;
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  header {
    background-color: rgba(255, 254, 254, 0.8);
    z-index: 99;
    width: 100%;
    position: fixed;
    transition: 0.5s ease all;
    color: #000000;
  
    nav {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 12px 0;
      transition: 0.5s ease all;
      width: 88%;
      margin: 0 auto;
      @media (min-width: 1140px) {
        max-width: 1140px;
      }
  
      ul {
        display: flex;
        flex-direction: column; /* Change to column */
        list-style: none;
        margin: auto 0;
        padding: 0;
  
        li {
          margin-bottom: 10px; // Adjust the margin according to your preference
        }
  
        .link {
          font-weight: 500;
          color: #020202;
          text-decoration: none;
          font-size: 14px;
          transition: 0.5s ease all;
          padding-bottom: 4px;
          border-bottom: 1px solid transparent;
  
          &:hover {
            color: #00afea;
            border-color: #00afea;
          }
        }
      }
  
      .branding {
        display: flex;
        align-items: center;
  
        .logo {
          width: 50px;
          transition: 0.5s ease all;
          margin-right: 10px; // Adjust the margin according to your preference
        }
      }
  
      .navigation {
        display: flex;
        align-items: center;
        flex: 1;
        justify-content: flex-end;
      }
  
      .icon {
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        right: 24px;
        height: 100%;
  
        i {
          cursor: pointer;
          font-size: 25px;
          transition: 0.8s ease all;
        }
      }
  
      .icon-active {
        transform: rotate(180deg);
      }
  
      .expanded-nav {
        height: 100vh; 
        flex-direction: column;
        align-items: flex-start;
        padding-top: 20px; 
      }
    }
  }
  
  .expand-enter-active,
  .expand-leave-active {
    transition: max-height 0s ease-in-out;
  }
  
  .expand-enter, .expand-leave-to  {
    max-height: 0;
  }
  </style>

  