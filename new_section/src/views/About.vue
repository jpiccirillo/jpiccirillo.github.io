<template>
  <section style="border-top: none">
    <span class="image left"
      ><img :src="require(`../assets/images/new.jpg`)"
    /></span>
    <p style="margin-top: 0px;">
      Hi I'm Jeffrey - a software engineer, earth scientist, and biker living in
      Austin, TX. I'm currently on the lookout for an
      <span style="font-weight:600"
        >engineering role in Austin where I can use my passion for developement
        and geospatial data.</span
      >
    </p>

    My primary interests bring together earth science, computer science, and
    visualization:
    <ul>
      <li class="bullet">
        Using scientific methods to better understand our world
      </li>
      <li class="bullet">
        Displaying the resulting data cleanly and efficiently
      </li>
      <li class="bullet">
        Using computer science to write software making this process accessible
        and reliable for everyone
      </li>
    </ul>

    I currently work at
    <a href="https://holos.io" target="_blank">Holos</a>, a virtual-reality
    startup
    <b
      >making it easier to design, author, and manage hands-on virtual learning
      experiences</b
    >. In my time at Holos, I've built our web product from the ground up -
    designing across the full stack:
    <ul>
      <li class="bullet">
        How to best store and retreive content in the database
      </li>
      <li class="bullet">
        Setting up our REST API from scratch, with flexible and durable server
        architecture patterns
      </li>
      <li class="bullet">
        Launching a feature-rich and pleasing front end web-application for our
        users to manage their profiles, VR content, and interact and share that
        content with others
      </li>
    </ul>

    <p style="margin-top: 2em;">
      Prior to working at Holos, I studied at UW-Madison completing the
      <a
        href="https://www.cs.wisc.edu/academics/graduate-programs/pcp"
        target="_blank"
        >Professional Capstone Certificate Program in Computer Sciences</a
      >
      and working as a GIS developer at the
      <a href="https://www.sco.wisc.edu/sco/" target="_blank"
        >Wisconsin State Cartographer's Office</a
      >. While there, I developed and improved web-applications that visualized
      interactive geospatial info, like microbial resistance datasets from
      hospitals and state-wide historical aerial photography. I also wrote
      Python scripts to clean and standardize data for use by Wisconsin counties
      and residents.
    </p>

    <p>
      I completed my bachelor’s degree in Earth Sciences at Rice University in
      Houston, TX and graduated in 2016. While there, I developed a passion for
      geospatial visualization, data science, and clean graphic design, which I
      prioritize in my computer science and geographic work. Beyond the
      sciences, I'm fascinated by writing systems and scripts - Through college
      coursework and language immersion in Amman, Jordan, I began to learn
      Arabic, and even took a stab at designing a font that embodied some
      stylistic and visual characteristics I wasn't able to find in pre-existing
      typefaces
    </p>

    <p>
      From field work in Turkey, Iceland and America to travel to the Middle
      East, I've had chances to spend time in other countries and cultures -
      experiences I wouldn't trade for anything. As field sites are based on
      important geology rather than tourism, field work gave me a serene and
      original view of locations that I wouldn't have gained otherwise. Because
      of this, surrounding myself with nature, the sun, and wildlife is how I
      most successfully relax and de-stress.
    </p>
    <p>Thanks for stopping by!</p>
  </section>
</template>

<style lang="scss" scoped>
.image.left > img {
  border-radius: 1000px;
  width: 100%;
}

.image.left {
  padding: 0 1.5em 1em 0;
  float: left;
  display: block;
  max-width: 250px;
  width: 40%;
  shape-outside: circle(131px at 155px 125px);
}

ul {
  padding: 0px;
  margin-top: 5px;
  .bullet {
    list-style-type: none;
    &::before {
      content: "•";
    }
  }
}
</style>
