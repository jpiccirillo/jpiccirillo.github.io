<template>
  <div class="section" style="margin: 0px; padding: 0px">
    <div class="panel section">
      <div class="title-and-pill">
        <h2 class="title">Visual Olfactory Training (VOLT) Application</h2>
        <a
          href="https://outcomesresearch.github.io/volt/login/"
          target="_blank"
          class="pill"
          :tag="`a`"
          >Live Site</a
        >
      </div>
      <h3>A new approach to smell re-training during clinical research</h3>
      <p>
        I built this web application for a clinical study conducted at
        Washington University in St Louis during January - June 2021. More than
        300 participants used the application on daily basis to complete their
        smell retraining exercises, log notes about their ongoing progress, get
        feedback on whether they're on-track for their current stage of the
        study.
      </p>
      <p>
        As I suspected most people would use the application on their phone or
        tablet, I prioritized the mobile experience, while ensuring that desktop
        responsiveness was still strong.
      </p>
    </div>
    <div class="grid grid-image-right">
      <section class="image panel">
        <image-with-hover
          :source="require(`../assets/images/volt/carousel.png`)"
        />
      </section>
      <div class="panel section">
        <h3>Background</h3>
        <p>
          This study investigated whether 'olfactory training' - regular
          smelling of specific sets of odors, while also viewing a strongly
          related image, could help bring back sense of smell for patients
          experiencing anosmia (loss of smell) after Covid-19.
        </p>
        <p>
          While all participants were assigned a set of odors to smell twice
          daily for each month of the study (vanilla, lemon, peppermint, clove,
          etc), only those in the experimental arm of the study looked at images
          while smell training.
        </p>
      </div>
    </div>
    <div class="panel section centered-statement">
      <h3>Advantages of using a web application</h3>
      <p>
        Originally, cardstock images were to be mailed to participants (a new
        set every month), and there was no true way to gauge participant
        'compliance' (how often and when they complete their smell trainings). A
        web approach has key advantages, in that it:
      </p>
      <ul>
        <li>
          <b>Records metrics natively</b>. The app logs to a Firebase store when
          participants start new session / begin each smell training, when each
          subsequent image in the carousel's time is up, and when the user has
          completed all images in the training. This level of detail is
          impossible with traditional administration
        </li>
        <li>
          <b>Allows participants to log notes directly in their profile</b>. A
          large number of people used this function, and in aggregate they are a
          critical qualitative complement to the compliance dataset,
          representing participants' self-perceived progress
        </li>
        <li>
          Avoids the logistics, time, and cost around mailing new image sets to
          hundreds of people (instead, just tweak the users' profile
          configurations to show different images). Users also get higher
          resolution / larger images
        </li>
        <li>
          Has a timing system built into image coursel during training, allowing
          users to pause and resume
        </li>
        <li>
          Incorpoates <span class="red">red</span> /
          <span class="orange">orange</span> /
          <span class="green">green</span> UI in the profile to display how
          up-to-date with trainings the participant is, for the current period
          of the study
        </li>
      </ul>
    </div>
    <div class="grid grid-image-left">
      <div class="panel section">
        <h3>Challenges</h3>
        <p>
          While simple on the surface, this project had a few snares. One was
          the crucial 'timer' function:
        </p>
        <ul>
          <li>
            Not only was ensuring all people smelled for the same time
            clinically important, it also determined when to log metrics, and
            was a convenience for participants.
          </li>
          <li>
            <b
              >Rudimentary methods like
              <span class="monospace"> setTimeout() </span> or
              <span class="monospace"> setInterval() </span> are not dependable
              time keepers in the browser
            </b>
            - they skip, jump ahead, or loose track tab-context changes or when
            appreciable amounts of time keeping occur.
          </li>
          <li>
            Staggered
            <span class="monospace"> requestAnimationFrame </span>
            approaches felt like overkill and made me concerned about
            performance.
          </li>
          <li>
            Ultimately I settled on a recursive Vue watcher-approach:
            <b
              >A variable to store time left, a watcher on that state variable
              which also decrements the state variable after 1 second, and a
              base-case (no time left) to end the recursion.</b
            >
          </li>
        </ul>
        <p>
          Working with Google Firebase represented another challenge:
        </p>
        <ul>
          <li>
            Although a main feature of Firebase is its 'realtime' nature
            (updates to the database are synced back and forth between the
            running app), in this case I was worried about incurring too many
            database hits due to the volume of users in peak parts of the day.
          </li>
          <li>
            Therefore, I became familiar with how to pull data once, then
            disconnect from the database, providing the features of the app from
            data already fetched, and re-updating the user's complicance profile
            only when needed.
          </li>
        </ul>
      </div>
      <div class="panel section">
        <h3>Tech Stack</h3>
        <div class="grid all-stack-items">
          <grid-item
            title="Vue.js"
            desc="to implement the frontend and handle login, profile management, routing, and other features"
            :icon="require(`../assets/images/home/vue.svg`)"
          />
          <grid-item
            title="Material Design UI"
            desc="to quickliy prototype-out user interfaces, components, and style"
            :icon="require(`../assets/images/volt/mdi.svg`)"
          />
          <grid-item
            title="Github Pages"
            desc="to host the frontend, DNS management, and to build and deploy the application when new code was merged"
            :icon="require(`../assets/images/volt/github.svg`)"
          />
          <grid-item
            title="Git"
            desc="to version control, roll back changes when necessary, and share code with study coordinators"
            :icon="require(`../assets/images/home/git.svg`)"
          />
          <grid-item
            title="Firebase Realtime Database"
            desc="to store notes, 'compliance' metrics, profiles / participants' authentication, and expose this smoothly to monitoring and post-study clinical analysis"
            :icon="require(`../assets/images/volt/firebase.svg`)"
          />
          <grid-item
            title="Firebase Storage"
            desc="to store high res images for all scents rather than include as static assets in the build, since only the photos required for the logged-in user were needed for training"
            :icon="require(`../assets/images/volt/firebase-storage-icon.png`)"
          />
        </div>
      </div>
    </div>
    <div class="grid half-half">
      <section class="image panel">
        <image-with-hover
          :source="require(`../assets/images/volt/homepage.png`)"
        />
      </section>
      <section class="image panel">
        <image-with-hover
          :source="require(`../assets/images/volt/taking-note.png`)"
        />
      </section>
    </div>
  </div>
</template>

<script>
import ImageWithHover from "@/components/ImageWithHover";
import GridItem from "@/components/GridItem";

export default {
  components: { ImageWithHover, GridItem },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/traffic-light.scss";
@import "@/assets/scss/pill.scss";
@import "@/assets/scss/gridLayouts.scss";
@import "@/assets/scss/grid-item-container.scss";
</style>
