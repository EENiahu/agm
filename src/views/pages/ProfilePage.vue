<template>
  <form action="">
    <v-row class="mb-6">
      <v-col cols="6">
        <h1>YOUR PROFILE / MEMBER</h1>
      </v-col>

      <v-col cols="6" align="end">
        <v-btn
            class="px-10"
            color="orange darken-2 white--text"
            depressed
            rounded
        >Save</v-btn>
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
              <v-text-field
                  color="orange"
                  label="Name"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-text-field
                  name="Email"
                  type="email"
                  color="orange"
                  label="Email"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-text-field
                  color="orange"
                  label="Work Telephone (optional)"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-text-field
                  color="orange"
                  label="Title"
                  hide-details="auto"
              ></v-text-field>
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
              <v-text-field
                  name="Password"
                  type="password"
                  color="orange"
                  label="Password"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-text-field
                  name="ConfirmPassword"
                  type="password"
                  color="orange"
                  label="Re-Enter Password"
                  hide-details="auto"
              ></v-text-field>
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
            <v-text-field
                color="orange"
                label="Property Management Company"
                hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <v-text-field
                name="Email"
                color="orange"
                label="Address 1"
                hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <v-text-field
                color="orange"
                label="Address 2"
                hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <v-text-field
                color="orange"
                label="City"
                hide-details="auto"
            ></v-text-field>
          </v-col>

          <v-col cols="2">
            <v-select
                :items="items"
                color="orange"
                label="Province"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <v-text-field
                color="orange"
                label="Country"
                hide-details="auto"
            ></v-text-field>
          </v-col>

          <v-col cols="2">
            <v-text-field
                color="orange"
                label="Postal COde"
                hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
    </div>
  </form>
</template>

<script>
  export default {
    name: "ProfilePage",
    data () {
      return {
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      }
    },
  }
</script>
