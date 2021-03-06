<template>
  <div>
    <Input
      type="search"
      placeholder="Search tips by title"
      v-model="searchQuery"
    />

    <div v-if="user && isFavorite === false">
      {{ uid }}
      <Button @click="addTip()" v-if="isOwner">Add new tip</Button>
      <div v-else>
        <Button type="button" @click="addNewFriend()" v-if="!isFollower">
          Add to friends
        </Button>
      </div>
    </div>

    <div v-if="tips.length">
      <Filters
        v-on:category-selected="selectCategory"
        :categories="categories"
        :selected="selectedCategory"
      />
      <div class="tip-container">
        <Tip
          v-for="tip in filteredTips"
          :key="tip.id"
          :tip="tip.content"
          :tip-id="tip.id"
          :is-owner="isOwner"
          :tip-owner-uid="uid"
          :is-follower="isFollower"
          :is-favorite="isFavorite"
          v-on:delete="deleteTip(tip)"
          v-on:edit="editTip(tip)"
          v-show="
            selectedCategory === 'ALL' ||
              tip.content.category === selectedCategory
          "
        />

        <div v-if="cta === true">
          <div class="user-message">
            <div class="user-message-emoji">😄</div>
            <div class="user-message-content">
              <h2>Want to see all tips from nelisthegreat69?</h2>
              <p>
                Register and will allow you to follow, like and save your
                friends or favorite tips.
              </p>

              <div>
                <Button type="button">
                  Click here to register
                </Button>
              </div>

              <a href="#">
                I’d like to know some more details
              </a>
            </div>
          </div>
        </div>
      </div>
      <div v-if="noResults">
        No results
      </div>
    </div>

    <div v-else>
      ...Loading
    </div>

    <EditTip
      :is-modal-visible="showEditModal"
      :tip="selectedTip"
      v-on:close="closeEditModal()"
      hasForm
    />
    <DeleteTip
      :is-modal-visible="showDeleteModal"
      :tip="selectedTip"
      v-on:close="closeDeleteModal()"
    />

    <AddTip :is-modal-visible="showAddModal" v-on:close="closeAddModal()" />
  </div>
</template>

<script>
import addFriend from "@/utils/addFriend";
import Input from "@/components/ui/Input";
import Tip from "@/components/tips/Tip";
import Filters from "@/components/tips/Filters";
import EditTip from "@/components/tips/EditTip";
import DeleteTip from "@/components/tips/DeleteTip";
import AddTip from "@/components/tips/AddTip";
import Button from "@/components/ui/Button";
import { mapGetters } from "vuex";

export default {
  name: "TipOverview",
  components: {
    DeleteTip,
    EditTip,
    Filters,
    Button,
    AddTip,
    Input,
    Tip,
  },
  data() {
    return {
      noResults: false,
      searchQuery: "",
      selectedTip: {},
      categories: [],
      selectedCategory: "ALL",
      showEditModal: false,
      showDeleteModal: false,
      showAddModal: false,
      isFollower: false,
    };
  },
  props: {
    tips: {
      type: Array,
      required: true,
    },
    isOwner: {
      type: Boolean,
      required: false,
    },
    isFavorite: {
      type: Boolean,
      required: false,
    },
    uid: {
      type: String,
      required: false,
    },
    slug: {
      type: String,
      required: false,
    },
    cta: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    ...mapGetters(["user", "followers"]),
    filteredTips() {
      const self = this;
      return this.tips.filter((tip) => {
        return tip.content.title.indexOf(self.searchQuery) !== -1;
      });
    },
  },
  watch: {
    followers: {
      immediate: true,
      handler(val) {
        if (val) {
          const follower = this.followers.find((o) => o.uid === this.uid);
          if (follower) this.isFollower = true;
        }
      },
    },
    filteredTips: {
      immediate: true,
      handler(val) {
        if (val) {
          this.categories = Array.from(
            new Set(val.map((element) => element.content.category))
          );
        }

        this.noResults = !val.length;
      },
    },
  },
  methods: {
    addNewFriend() {
      addFriend(this.uid)
        .then(() => {
          this.$notificationHub.$emit(
            "success",
            `Waiting on confirmation by ${this.slug}`
          );
        })
        .catch((error) => {
          if (error === "duplicate") {
            this.$notificationHub.$emit(
              "error",
              `You already invited ${this.slug}`
            );
          }
        });
    },
    selectCategory(payload) {
      this.selectedCategory = payload;
    },
    closeEditModal() {
      this.selectedTip = {};
      this.showEditModal = false;
    },
    closeDeleteModal() {
      this.selectedTip = {};
      this.showDeleteModal = false;
    },
    closeAddModal() {
      this.showAddModal = false;
    },
    deleteTip(tip) {
      this.selectedTip = tip;
      this.showDeleteModal = true;
    },
    editTip(tip) {
      this.selectedTip = tip;
      this.showEditModal = true;
    },
    addTip() {
      this.showAddModal = true;
    },
  },
};
</script>

<style lang="scss">
.user-message {
  border: 2px dashed white;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.25);
  text-align: center;
  height: 100%;
  padding: 2em;

  .user-message-emoji {
    font-size: 2rem;
  }
}

.tip-container {
  margin: 0 auto;
  display: grid;
  grid-gap: 1em;
  padding: 1em;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1500px) {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
