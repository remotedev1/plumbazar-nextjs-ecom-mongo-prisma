"use client";

// RHF
import { useFormContext } from "react-hook-form";

// ShadCn
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// Components
import ChargeInput from "../../form-fields/ChargeInput";

// context
import { useChargesContext } from "@/providers/charges-provider";

// Helpers
import { formatNumberWithCommas } from "@/lib/helpers";

const Charges = () => {
  const {
    formState: { errors },
  } = useFormContext();

  const {
    discountSwitch,
    setDiscountSwitch,
    taxSwitch,
    setTaxSwitch,
    shippingSwitch,
    setShippingSwitch,
    totalInWordsSwitch,
    setTotalInWordsSwitch,
    currency,
    subTotal,
    totalAmount,
  } = useChargesContext();

  return (
    <>
      {/* Charges */}
      <div className="flex flex-col gap-3 min-w-[20rem]">
        {/* Switches */}
        <div className="flex justify-evenly pb-6">
          <div>
            <Label>discount</Label>

            <div>
              <div>
                <Switch
                  checked={discountSwitch}
                  onCheckedChange={(value) => {
                    setDiscountSwitch(value);
                  }}
                />
              </div>
            </div>
          </div>

          <div>
            <Label>tax</Label>

            <div>
              <div>
                <Switch
                  checked={taxSwitch}
                  onCheckedChange={(value) => {
                    setTaxSwitch(value);
                  }}
                />
              </div>
            </div>
          </div>

          <div>
            <Label>shipping</Label>

            <div>
              <div>
                <Switch
                  checked={shippingSwitch}
                  onCheckedChange={(value) => {
                    setShippingSwitch(value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center px-5 gap-y-3">
          <div className="flex justify-between items-center">
            <div>subTotal</div>

            <div>
              {formatNumberWithCommas(subTotal)} {currency}
            </div>
          </div>
          {discountSwitch && (
            <ChargeInput
              label="discount"
              name="details.discountAmount"
              currency={currency}
            />
          )}

          {taxSwitch && (
            <ChargeInput
              label="tax"
              name="details.taxAmount"
              currency={currency}
            />
          )}

          {shippingSwitch && (
            <ChargeInput
              label="shipping"
              name="details.shippingAmount"
              currency={currency}
            />
          )}

          <div className="flex justify-between items-center">
            <div>totalAmount</div>

            <div className="">
              <p>
                {formatNumberWithCommas(totalAmount)} {currency}
              </p>

              <small className="text-sm font-medium text-destructive">
                {errors.details?.totalAmount?.message}
              </small>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p>includeTotalInWords</p>{" "}
            <p>{totalInWordsSwitch ? "yes" : "no"}</p>
            <Switch
              checked={totalInWordsSwitch}
              onCheckedChange={(value) => {
                setTotalInWordsSwitch(value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Charges;
