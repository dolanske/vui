<script setup lang='ts'>
import Button from '../components/Button/Button.vue'
import Card from '../components/Card/Card.vue'
import Flex from '../components/Flex/Flex.vue'
import Grid from '../components/Grid/Grid.vue'
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Cards
    </h3>

    <Grid :columns="2" gap="xl">
      <Flex column gap="xl">
        <div>
          <strong class="block mb-s">Base</strong>
          <Card>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci eligendi quos inventore voluptas ab saepe fugit deleniti ipsam exercitationem impedit quod rem ipsum laborum, quis quam error ipsa corrupti. Dolorem!</p>
          </Card>
        </div>

        <div>
          <strong class="block mb-s">With header</strong>
          <Card>
            <template #header>
              <h4>Hello</h4>
            </template>
            <template #header-end>
              <Button icon="ph:x" plain size="s" />
            </template>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci eligendi quos inventore voluptas ab saepe fugit deleniti ipsam exercitationem impedit quod rem ipsum laborum, quis quam error ipsa corrupti. Dolorem!</p>
          </Card>
        </div>

        <div>
          <strong class="block mb-s">With footer</strong>
          <Card>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci eligendi quos inventore voluptas ab saepe fugit deleniti ipsam exercitationem impedit quod rem ipsum laborum, quis quam error ipsa corrupti. Dolorem!</p>

            <template #footer>
              <Flex gap="s" justify-end>
                <Button>Cancel</Button>
                <Button variant="success">
                  Save
                </Button>
              </Flex>
            </template>
          </Card>
        </div>
      </Flex>
      <Flex column gap="xl">
        <div>
          <strong class="block mb-s">With header + separators (each separator can be individually disabled)</strong>
          <Card separators>
            <template #header>
              <h4>Hello</h4>
            </template>
            <template #header-end>
              <Button icon="ph:x" plain size="s" />
            </template>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci eligendi quos inventore voluptas ab saepe fugit deleniti ipsam exercitationem impedit quod rem ipsum laborum, quis quam error ipsa corrupti. Dolorem!</p>
            <template #footer>
              <Flex gap="s" justify-end>
                <Button>Cancel</Button>
                <Button variant="success">
                  Save
                </Button>
              </Flex>
            </template>
          </Card>
        </div>

        <Card :header-separator="false" footer-separator>
          <template #header>
            <h4>Hello</h4>
          </template>
          <template #header-end>
            <Button icon="ph:x" plain size="s" />
          </template>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci eligendi quos inventore voluptas ab saepe fugit deleniti ipsam exercitationem impedit quod rem ipsum laborum, quis quam error ipsa corrupti. Dolorem!</p>
          <template #footer>
            <Flex gap="s" justify-end>
              <Button>Cancel</Button>
              <Button variant="success">
                Save
              </Button>
            </Flex>
          </template>
        </Card>
      </Flex>
    </Grid>
  </div>
</template>
