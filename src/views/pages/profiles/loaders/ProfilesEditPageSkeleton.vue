<template>
  <div>
    <v-row class="mb-6">
      <v-col cols="6">
        <h1>YOUR PROFILE / OWNER</h1>
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
              <h3>Change profile details</h3>
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
              <h3>Change your password</h3>
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

    <div>
      <v-row class="mb-6">
        <v-col cols="6">
          <h1>COMPANY PROFILE</h1>
        </v-col>
      </v-row>

      <div>
        <v-row>
          <v-col cols="4">
            <v-skeleton-loader type="text" height="30"></v-skeleton-loader>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <v-skeleton-loader type="text" height="30"></v-skeleton-loader>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <v-skeleton-loader type="text" height="30"></v-skeleton-loader>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <v-skeleton-loader type="text" height="30"></v-skeleton-loader>
          </v-col>

          <v-col cols="2">
            <v-skeleton-loader type="text" height="30"></v-skeleton-loader>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <v-skeleton-loader type="text" height="30"></v-skeleton-loader>
          </v-col>

          <v-col cols="2">
            <v-skeleton-loader type="text" height="30"></v-skeleton-loader>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ProfileEditPageSkeleton",
}
</script>
