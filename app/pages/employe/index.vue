<script setup lang="ts">
import {useApiFetch} from "~/composables/useApiFetch";

definePageMeta({
  middleware: ['auth', 'role'],
  role: 'ROLE_EMPLOYEE',
})

const { apiFetch } = useApiFetch()

const search = ref('')
const customers = ref<Customer[]>([])
const selectedCustomer = ref<Customer | null>(null)
const loadingSearch = ref(false)
const loadingCodes = ref(false)
const claimingCode = ref<number | null>(null)
const toast = useToast()

let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(search, () => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(async () => {
    if (search.value.trim().length < 2) {
      customers.value = []
      selectedCustomer.value = null
      return
    }

    loadingSearch.value = true
    try {
      customers.value = await apiFetch('/api/employee/customers', {
        query: { search: search.value.trim() }
      })
      selectedCustomer.value = null
    } catch {
      toast.add({ title: 'Erreur lors de la recherche', color: 'red' })
    } finally {
      loadingSearch.value = false
    }
  }, 400)
})

// Sélection d'un client et chargement de ses codes
async function selectCustomer(customer: Customer) {
  selectedCustomer.value = customer
  loadingCodes.value = true

  try {
    // On récupère les codes via l'endpoint personnalisé /api/users/{id}
    const codes = await apiFetch<CustomerCode[]>(`/api/employee/customers/${customer.id}/codes`)
    selectedCustomer.value = { ...customer, codes }
  } catch {
    toast.add({ title: 'Erreur lors du chargement des gains', color: 'red' })
  } finally {
    loadingCodes.value = false
  }
}

async function claimCode(code: CustomerCode) {
  claimingCode.value = code.id

  try {
    await apiFetch('/api/employee/codes/claim', {
      method: 'POST',
      body: { code: code.code }
    })

    // Mise à jour locale sans re-fetch
    if (selectedCustomer.value?.codes) {
      const idx = selectedCustomer.value.codes.findIndex(c => c.id === code.id)
      if (idx !== -1) {
        const current = selectedCustomer.value.codes[idx]
        if(current){
          selectedCustomer.value.codes[idx] = {
            ...current,
            isClaimed: true,
            claimedOn: new Date().toISOString().split('T')[0] ?? null
          }
        }
      }
    }

    toast.add({ title: 'Lot remis avec succès', color: 'green' })
  } catch (error: any) {
    toast.add({ title: error.data?.message ?? 'Erreur lors de la remise', color: 'red' })
  } finally {
    claimingCode.value = null
  }
}

function fullName(customer: Customer) {
  return [customer.firstName, customer.lastName].filter(Boolean).join(' ') || customer.email
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 space-y-6">
    <h1 class="text-2xl font-bold mb-8 text-center">Dashboard Employé</h1>

    <UAlert
        icon="i-heroicons-information-circle"
        color="primary"
        variant="soft"
        title="Comment procéder ?"
    >
      <template #description>
        <ol class="list-decimal list-inside space-y-1 mt-1">
          <li>Recherchez un client par nom, prénom ou email</li>
          <li>Sélectionnez-le pour voir ses gains</li>
          <li>Une fois le lot remis, cliquez sur "Valider la remise" pour le lot concerné </li>
        </ol>
      </template>
    </UAlert>
    <!-- Barre de recherche -->
    <UFormGroup name="client-search">
      <template #label>
                <span class="ttt-form-label">
                  Rechercher un client (nom, prénom, email)…
                </span>
      </template>

      <UInput
          v-model="search"
          placeholder="Jean Morris"
          icon="i-heroicons-magnifying-glass"
          size="lg"
          class="ttt-input-dark"
          :loading="loadingSearch"
      />
    </UFormGroup>
    <!-- Liste des résultats -->
    <div v-if="customers.length > 0 && !selectedCustomer" class="rounded-xl border border-white/20 divide-y divide-white/10 overflow-hidden">
      <button
          v-for="customer in customers"
          :key="customer.id"
          class="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors"
          @click="selectCustomer(customer)"
      >
        <span class="font-medium text-white">{{ fullName(customer) }}</span>
        <span class="text-sm text-white ml-2 italic">({{ customer.email }})</span>
      </button>
    </div>

    <p v-else-if="search.length >= 2 && !loadingSearch && customers.length === 0" class="text-gray-500">
      Aucun client trouvé.
    </p>

    <!-- Détail client sélectionné -->
    <div v-if="selectedCustomer" class="space-y-4">
      <div class="flex items-center gap-3">
        <UButton
            icon="i-heroicons-arrow-left"
            variant="ghost"
            aria-label="Sortir du listing des gains de ce client"
            @click="selectedCustomer = null"
        />
        <h2 class="text-xl font-semibold m-0">{{ fullName(selectedCustomer) }}</h2>
        <span class="text-white italic">({{ selectedCustomer.email }})</span>
      </div>

      <!-- Chargement des codes -->
      <div v-if="loadingCodes" class="flex justify-center py-8">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin text-2xl" />
      </div>

      <!-- Aucun gain -->
      <p v-else-if="!selectedCustomer.codes?.length" class="text-gray-500">
        Ce client n'a aucun gain validé.
      </p>

      <!-- Liste des gains -->
      <div v-else class="space-y-3">
        <div
            v-for="code in selectedCustomer.codes"
            :key="code.id"
            class="rounded-xl p-4 flex items-center justify-between gap-4 border transition-opacity"
            :class="code.isClaimed
            ? 'bg-white/5 border-white/10 opacity-50'
            : 'bg-white/10 border-white/20'"
        >
          <div class="space-y-1 min-w-0">
            <h3 class="text-xl font-semibold text-white">{{ code.gainName ?? 'Gain inconnu' }}</h3>
            <p class="text-sm text-gray-400">
              Code : <code class="font-mono text-gray-300">{{ code.code }}</code>
            </p>
            <p class="text-sm text-gray-400">
              Validé le {{ code.validatedOn }}
            </p>
            <p v-if="code.isClaimed" class="text-sm text-emerald-400 flex items-center gap-1">
              <UIcon name="i-heroicons-check-circle" class="w-4 h-4" />
              Remis le {{ code.claimedOn }}
            </p>
          </div>

          <div class="shrink-0">
            <UButton
                v-if="!code.isClaimed"
                label="Valider la remise"
                color="primary"
                :loading="claimingCode === code.id"
                @click="claimCode(code)"
            />
            <UBadge v-else label="Remis" color="green" variant="soft" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>