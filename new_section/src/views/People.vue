<template>
  <div class="masonry">
    <section>
      <img
        class="surf-image panel"
        :src="require(`../assets/images/people/People-01.jpg`)"
      />
    </section>
    <section>
      <img
        class="surf-image panel"
        :src="require(`../assets/images/people/People-02.jpg`)"
      />
    </section>
    <section>
      <img
        class="surf-image panel"
        :src="require(`../assets/images/people/People-03.jpg`)"
      />
    </section>
    <section>
      <img
        class="surf-image panel"
        :src="require(`../assets/images/people/People-04.jpg`)"
      />
    </section>
    <section>
      <img
        class="surf-image panel"
        :src="require(`../assets/images/people/People-05.jpg`)"
      />
    </section>
    <section>
      <img
        class="surf-image panel"
        :src="require(`../assets/images/people/People-06.jpg`)"
      />
    </section>
    <section>
      <img
        class="surf-image panel"
        :src="require(`../assets/images/people/People-07.jpg`)"
      />
    </section>
    <section>
      <img
        class="surf-image panel"
        :src="require(`../assets/images/people/People-08.jpg`)"
      />
    </section>
    <section>
      <img
        class="surf-image panel"
        :src="require(`../assets/images/people/People-09.jpg`)"
      />
    </section>
    <section>
      <img
        class="surf-image panel"
        :src="require(`../assets/images/people/People-10.jpg`)"
      />
    </section>
    <section>
      <img
        class="surf-image panel"
        :src="require(`../assets/images/people/People-11.jpg`)"
      />
    </section>
    <section>
      <img
        class="surf-image panel"
        :src="require(`../assets/images/people/People-12.jpg`)"
      />
    </section>
    <section>
      <img
        class="surf-image panel"
        :src="require(`../assets/images/people/People-13.jpg`)"
      />
    </section>
    <section>
      <img
        class="surf-image panel"
        :src="require(`../assets/images/people/People-14.jpg`)"
      />
    </section>
    <section>
      <img
        class="surf-image panel"
        :src="require(`../assets/images/people/People-15.jpg`)"
      />
    </section>
    <section>
      <img
        class="surf-image panel"
        :src="require(`../assets/images/people/People-16.jpg`)"
      />
    </section>
    <section>
      <img
        class="surf-image panel"
        :src="require(`../assets/images/people/People-17.jpg`)"
      />
    </section>
    <section>
      <img
        class="surf-image panel"
        :src="require(`../assets/images/people/People-18.jpg`)"
      />
    </section>
  </div>
</template>

<style lang="scss" scoped>
section {
  width: unset;
  margin: unset;
}
.panel {
  padding: unset;
}

.masonry {
  /* Masonry container */
  column-count: 4;
  column-gap: 1em;
  margin: 1.25rem 1.5rem;
}

.surf-image {
  /* Masonry bricks or child elements */
  background-color: #eee;
  display: inline-block;
  width: 100%;
  margin-bottom: 1rem;
}
</style>
