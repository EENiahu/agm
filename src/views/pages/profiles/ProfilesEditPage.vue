<template>
  <PropertyManagerProfileEditPage v-if="userRoleId === 3"/>
  <PropertyOwnerProfileEditPage v-else-if="userRoleId === 2"/>
  <CondoOwnerProfileEditPage v-else-if="userRoleId === 4"/>
</template>

<script>
  import mixinForm from "@/mixins/form";
  import ProfilesEditPageSkeleton from '@/views/pages/profiles/loaders/ProfilesEditPageSkeleton';
  import PropertyManagerProfileEditPage from '@/views/pages/profiles/layouts/PropertyManagerProfileEditPage';
  import PropertyOwnerProfileEditPage from '@/views/pages/profiles/layouts/PropertyOwnerProfileEditPage';
  import CondoOwnerProfileEditPage from '@/views/pages/profiles/layouts/CondoOwnerProfileEditPage';

  export default {
    name: "ProfilesEditPage",
    mixins: [mixinForm],
    components: {
      ProfilesEditPageSkeleton,
      PropertyManagerProfileEditPage,
      PropertyOwnerProfileEditPage,
      CondoOwnerProfileEditPage
    },

    data () {
      return {
        userRoleId: this.$store.getters["auth/user"].role.id,
      }
    },
  }
</script>
