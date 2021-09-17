<template>
  <div>
    <v-row class="mb-6">
      <v-col cols="6">
        <v-skeleton-loader class="" type="text" width="50%"></v-skeleton-loader>
      </v-col>

      <v-col cols="6" align="end">
        <v-skeleton-loader class="d-flex justify-end" type="chip" width="100%"></v-skeleton-loader>
      </v-col>
    </v-row>

    <div class="mb-12">
      <v-row>
        <v-col>
          <v-row>
            <v-col cols="8">
              <v-skeleton-loader type="text" height="30"></v-skeleton-loader>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-skeleton-loader type="text" height="30"></v-skeleton-loader>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-skeleton-loader type="text" height="30"></v-skeleton-loader>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-skeleton-loader type="text" height="30"></v-skeleton-loader>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-skeleton-loader type="text" height="30"></v-skeleton-loader>
            </v-col>
          </v-row>
        </v-col>

        <v-col>
          <v-row>
            <v-col cols="8">
              <v-skeleton-loader type="text" height="30"></v-skeleton-loader>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-skeleton-loader type="text" height="30"></v-skeleton-loader>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-skeleton-loader type="text" height="30"></v-skeleton-loader>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProfileEditPageSkeleton",
  }
</script>
