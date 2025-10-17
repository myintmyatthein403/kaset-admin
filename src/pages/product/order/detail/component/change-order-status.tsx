import { SelectField } from "@/components/custom/input/input-field"
import { Button } from "@/components/ui/button"
import { useBaseHook } from "@/hooks/base.hook"
import { useForm } from "@tanstack/react-form"

const orderStatusOptions = [
  {
    label: "pending",
    value: "pending"
  },
  {
    label: "processing",
    value: "processing"
  },
  {
    label: "shipped",
    value: "shipped"
  },
  {
    label: "delivered",
    value: "delivered"
  },
  {
    label: "cancelled",
    value: "cancelled"
  },
  {
    label: "refund",
    value: "refund"
  },

]

export const ChangeOrderStatus = ({
  orderId,
  status
}: { orderId: string, status: string }) => {

  const {
    updateMutation,
  } = useBaseHook(`orders`, `/order`)

  const {
    refresh,
  } = useBaseHook(`order-${orderId}`, `/order/${orderId}`)

  const form = useForm({
    defaultValues: {
      order_status: status
    },
    onSubmit: async ({ value }) => {
      await updateMutation.mutateAsync({ ...value, id: orderId });
      refresh();
      form.reset()
    }
  })

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      form.handleSubmit()
    }}>
      <div className="p-4 bg-background border rounded-lg flex flex-col gap-6">
        <form.Field name="order_status">
          {(field) => (
            <SelectField options={orderStatusOptions} field={field} title="Order Status" />
          )}
        </form.Field>
        <Button type="submit" className="w-full">Change Status</Button>
      </div>
    </form>
  )
}
