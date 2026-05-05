<script setup lang="ts">
import { Badge, BadgeGroup, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex gap="m" x-center>
        <BadgeGroup :gap="2">
          <Badge variant="success" circle>
            <Icon name="ph:command" />
          </Badge>
          <Badge variant="warning" circle>
            <Icon name="ph:bell" />
          </Badge>
        </BadgeGroup>

        <BadgeGroup>
          <Badge variant="success" outline>
            Merged
          </Badge>
          <Badge variant="info" outline>
            v2.4.0
          </Badge>
        </BadgeGroup>

        <BadgeGroup :gap="2">
          <Badge variant="success" filled>
            Build
          </Badge>
          <Badge variant="neutral" filled>
            Ok
          </Badge>
        </BadgeGroup>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
