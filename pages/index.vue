<script setup lang="ts">
import type { OnlyPathArticle } from '~~/utils/article';

const config = useRuntimeConfig();
const router = useRouter();
const query = get_default_query();
const { data } = await useAsyncData('last-article-only-path', () => {
  return queryContent<OnlyPathArticle>(query)
    .only(['_path'])
    .limit(1)
    .skip(config.public.default_skip)
    .findOne();
});
const article = remove_pick_from_ref(data);
const path = computed(() => {
  let _path: string = config.public.post_prefix;
  if (!article.value._path.startsWith('/')) {
    _path += '/';
  }
  return _path + article.value._path;
});
onMounted(() => {
  router.push(path.value);
});
</script>
