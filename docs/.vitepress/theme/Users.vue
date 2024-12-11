<script>
export const users = [
  {
    name: "Ahrefs",
    image: "ahrefs.svg",
    infoLink: "https://ahrefs.com",
  },
  {
    name: "Qwick",
    image: "qwick.svg",
    infoLink: "https://qwick.com"
  },
  {
    name: "CMap",
    image: "cmap.svg",
    infoLink: "https://www.cmap.io/atvero-pim",
  },
  {
    name: "Droplet",
    image: "droplet.png",
    infoLink: "https://droplet.io",
  },
  {
    name: "Instapainting",
    image: "instapainting.svg",
    infoLink: "https://instapainting.com",
  }
].map(user => { return { ...user, image: `${import.meta.env.BASE_URL}/logos/${user.image}` } })

export default {
  data() {
    return { users };
  },
};
</script>

<template>
  <div class="company-logos">
    <h2>Users of Melange</h2>
    <div class="logos">
      <a v-for="user in users" :key="user.name" :href="user.infoLink">
        <img :src="user.image" :alt="user.name" />
      </a>
    </div>
  </div>
</template>

<style scoped>
.company-logos {
  text-align: center;
  padding-top: 48px;
}

.company-logos h2 {
  font-family: var(--vp-font-family-base);
  font-weight: 700;
  font-size: 36px;
  line-height: 36px;
  color: var(--vp-c-brand-1);
}

.logos {
  display: flex;
  gap: 20px;
  padding: 20px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.logos img {
  height: 70px;
  max-width: 210px;
  transition: transform 0.2s;
}

.logos img:hover {
  transform: scale(1.05);
}
</style>
