<template
  ><div>
    <section>
      <div class="panel">
        <p>
          Just an hour southwest of downtown Houston, Galveston Island's beaches
          sometimes are the butt-end of local jokes comparing Texas coastlines
          to more scenic options in other states. However, growing up in a
          land-locked state, I'm a firm believer that any beach is better than
          no beach. After repeated visits to Galveston, I've grown fond of the
          salty, warm breeze, sandy reeds and cacti, and dunes along its shores.
        </p>
        <p>
          In this photo project, I showcase the movement of water and foam
          through long exposures in black and white format.
        </p>
      </div>
    </section>
    <section>
      <img
        class="surf-image panel image"
        :src="require(`../assets/images/surf/surf-1.jpg`)"
      />
    </section>
    <section>
      <img
        class="surf-image panel image"
        :src="require(`../assets/images/surf/surf-2.jpg`)"
      />
    </section>
    <section>
      <img
        class="surf-image panel image"
        :src="require(`../assets/images/surf/surf-3.jpg`)"
      />
    </section>
    <section>
      <img
        class="surf-image panel image"
        :src="require(`../assets/images/surf/surf-4.jpg`)"
      />
    </section>
    <section>
      <img
        class="surf-image panel image"
        :src="require(`../assets/images/surf/surf-5.jpg`)"
      />
    </section>
    <section>
      <img
        class="surf-image panel image"
        :src="require(`../assets/images/surf/surf-6.jpg`)"
      />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.surf-image {
  max-width: 100%;
  border-radius: 5px;
  padding: 0px;
}
</style>
