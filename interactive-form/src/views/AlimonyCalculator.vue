<template>
  <Vueform size="md" :display-errors="false" add-class="vf-alimony-calculator">
    <template #empty>
      <!-- Define Form Steps -->
      <FormSteps>
        <FormStep
          name="income"
          label="Einkommen"
          :elements="['income_group']"
          :labels="{
            previous: 'Zurück',
            next: 'Weiter',
          }"
        />
        <FormStep
          name="partners_and_children"
          label="Unterhaltspflichtige Personen"
          :elements="['partners_and_children']"
          :labels="{
            previous: 'Zurück',
            next: 'Berechnung starten',
          }"
        />
      </FormSteps>

      <!-- Define Form Elements -->
      <FormElements>
        <GroupElement name="income_group">
          <TextElement
            name="living_expenses"
            label="Lebenshaltungskosten"
            :mask="{
              mask: 'number',
              thousandsSeparator: '\'',
              scale: 0,
            }"
            :rules="['required']"
            autocomplete="off"
            :addons="{
              after: ' CHF',
            }"
          />
          <TextElement
            name="actual_income"
            label="Effektives Erwerbseinkommen"
            :mask="{
              mask: 'number',
              thousandsSeparator: '\'',
              scale: 0,
            }"
            :rules="['required']"
            autocomplete="off"
            :addons="{
              after: ' CHF',
            }"
          />
          <TextElement
            name="hypothetical_income"
            label="Hypothetisches Erwerbseinkommen"
            :mask="{
              mask: 'number',
              thousandsSeparator: '\'',
              scale: 0,
            }"
            :rules="['required']"
            autocomplete="off"
            :addons="{
              after: ' CHF',
            }"
          />

          <!-- Zumutbare Arbeitspensen des betreuenden Elternteils
          Phase 1 (Geburt bis Eintritt obligatorische Schule)	0%
          Phase 2 (Eintritt obligatorische Schule bis Eintritt Sek I)	50%
          Phase 3 (Eintritt Sek I bis 16. Geburtstag)	80% -->
        </GroupElement>

        <GroupElement name="partners_and_children">
          <StaticElement name="instructions" tag="p" content="Erfassen Sie alle unterhaltsplichtigen Personen und ihre Kinder." />
          <ListElement name="partners" add-text="+ Hinzufügen" :min="1">
            <template v-slot="{ index: partnerIndex }">
              <ObjectElement
                :name="partnerIndex"
                :label="`Unterhaltspflichtige Person #${partnerIndex + 1}`"
                view="H3Label"
                :add-classes="{
                  ObjectElement: { container: 'card partner' },
                  ElementLabel: { container: 'card-title' },
                  ElementLayout: { outerWrapper: 'card-body' },
                }"
              >
                <TextElement name="name" placeholder="Name" :rules="['required']" />
                <ListElement name="children" :min="1" add-text="+ Hinzufügen">
                  <template v-slot="{ index: childIndex }">
                    <ObjectElement
                      :name="childIndex"
                      :label="`Kind #${partnerIndex + 1}.${childIndex + 1}`"
                      view="H4Label"
                      :add-classes="{
                        ObjectElement: { container: 'card child' },
                        ElementLabel: { container: 'card-title' },
                        ElementLayout: { outerWrapper: 'card-body' },
                      }"
                    >
                      <TextElement name="name" placeholder="Name" :rules="['required']" />
                      <DateElement
                        name="date_of_birth"
                        label="Geburtsdatum"
                        display-format="DD.MM.YYYY"
                        value-format="YYYY-MM-DD"
                        :rules="['required']"
                      />
                      <DateElement
                        name="start_primary"
                        label="Eintritt obligatorische Schule"
                        display-format="DD.MM.YYYY"
                        value-format="YYYY-MM-DD"
                        :rules="['required', `after:partners.${partnerIndex}.children.${childIndex}.date_of_birth`]"
                      />
                      <DateElement
                        name="start_secondary"
                        label="Eintritt Sek I"
                        display-format="DD.MM.YYYY"
                        value-format="YYYY-MM-DD"
                        :rules="['required', `after:partners.${partnerIndex}.children.${childIndex}.start_primary`]"
                      />
                    </ObjectElement>
                  </template>
                </ListElement>
              </ObjectElement>
            </template>
          </ListElement>
        </GroupElement>
      </FormElements>

      <FormStepsControls />
      <!-- <ButtonElement name="submit" :submits="true" button-label="" :full="true" size="lg" /> -->
    </template>
  </Vueform>
</template>

<style lang="scss">
@import "bootstrap/scss/bootstrap";

.vf-alimony-calculator *,
.vf-alimony-calculator *:before,
.vf-alimony-calculator *:after,
.vf-alimony-calculator:root {
  --vf-primary: #007bff;
  --vf-primary-darker: #0056b3;
}

.vf-alimony-calculator .partner {
  background-color: $gray-100;
  // border-color: $gray-300;
}

.vf-alimony-calculator .child {
  background-color: $gray-200;
  border-color: $gray-200;
}
</style>
