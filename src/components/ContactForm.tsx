import { useState } from "react";
import { Check, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";
type Field = "name" | "email" | "whatsapp" | "service" | "message";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const WHATSAPP_REGEX = /^\(\d{2}\) \d{5}-\d{4}$/;
const NAME_REGEX = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/;

const maskWhatsapp = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
};

const validateField = (field: Field, value: string): string => {
  switch (field) {
    case "name":
      return value.trim() ? (NAME_REGEX.test(value.trim()) ? "" : "Nome deve ter pelo menos 3 caracteres") : "Nome é obrigatório";
    case "email":
      return value.trim() ? (EMAIL_REGEX.test(value.trim()) ? "" : "Email inválido. Exemplo: seu@email.com") : "Email é obrigatório";
    case "whatsapp":
      return value.trim() ? (WHATSAPP_REGEX.test(value.trim()) ? "" : "Telefone inválido. Formato: (11) 99999-9999") : "WhatsApp é obrigatório";
    case "service":
      return value ? "" : "Selecione um serviço";
    default:
      return "";
  }
};

const SERVICES = [
  { value: "site", label: "Site Institucional" },
  { value: "landing-page", label: "Landing Page" },
  { value: "saas", label: "SaaS" },
  { value: "crm", label: "CRM" },
  { value: "trafego", label: "Tráfego Pago" },
  { value: "automacao", label: "Automação WhatsApp" },
];

export default function ContactForm() {
  const [fields, setFields] = useState({ name: "", email: "", whatsapp: "", service: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const inputClass = (field: Field) =>
    `w-full px-4 py-3 rounded-xl bg-[var(--surface-card-secondary)] border text-[var(--text-on-surface)] placeholder-[var(--text-on-surface-subtle)] focus:ring-1 outline-none transition-all ${
      touched[field] && errors[field]
        ? "border-error focus:border-error focus:ring-error"
        : "border-[var(--surface-border)] focus:border-tech focus:ring-tech"
    }`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const masked = name === "whatsapp" ? maskWhatsapp(value) : value;
    setFields((prev) => ({ ...prev, [name]: masked }));
    if (touched[name as Field]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name as Field, masked) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name as Field, value) }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, whatsapp: true, service: true, message: true };
    setTouched(allTouched);
    const nextErrors = {
      name: validateField("name", fields.name),
      email: validateField("email", fields.email),
      whatsapp: validateField("whatsapp", fields.whatsapp),
      service: validateField("service", fields.service),
    };
    setErrors(nextErrors);
    const valid = Object.values(nextErrors).every((v) => !v);
    if (!valid) return;

    setStatus("submitting");
    try {
      const website = (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
      const response = await fetch("/send-email.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ ...fields, website }),
      });
      const data: { ok?: boolean } | null = await response.json().catch(() => null);
      if (response.ok && data?.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl p-12 text-center bg-white dark:bg-white/5 border border-[var(--surface-border)] animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-success" />
        </div>
        <h3 className="text-2xl font-display font-bold text-[var(--text-on-surface)] mb-3">
          Recebemos seus dados!
        </h3>
        <p className="text-[var(--text-on-surface-muted)]">
          Em até 2h úteis entraremos em contato.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-8 md:p-12 bg-white dark:bg-white/5 border border-[var(--surface-border)]">
      <h3 className="text-2xl font-display font-bold text-[var(--text-on-surface)] mb-2">
        Vamos conversar sobre seu projeto
      </h3>
      <p className="text-[var(--text-on-surface-muted)] mb-8">
        Preencha o formulário e receba um diagnóstico gratuito em até 2h.
      </p>
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[var(--text-on-surface)] mb-2">
            Nome completo <span className="text-error">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Seu nome completo"
            value={fields.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.name && !!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass("name")}
          />
          {touched.name && errors.name && (
            <p id="name-error" role="alert" className="mt-2 text-sm text-error flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--text-on-surface)] mb-2">
            Email <span className="text-error">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="seu@email.com"
            value={fields.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.email && !!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass("email")}
          />
          {touched.email && errors.email && (
            <p id="email-error" role="alert" className="mt-2 text-sm text-error flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="whatsapp" className="block text-sm font-medium text-[var(--text-on-surface)] mb-2">
            WhatsApp <span className="text-error">*</span>
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            required
            placeholder="(11) 99999-9999"
            value={fields.whatsapp}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.whatsapp && !!errors.whatsapp}
            aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
            className={inputClass("whatsapp")}
          />
          {touched.whatsapp && errors.whatsapp && (
            <p id="whatsapp-error" role="alert" className="mt-2 text-sm text-error flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.whatsapp}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium text-[var(--text-on-surface)] mb-2">
            Serviço de interesse <span className="text-error">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            value={fields.service}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.service && !!errors.service}
            aria-describedby={errors.service ? "service-error" : undefined}
            className={inputClass("service")}
          >
            <option value="">Selecione um serviço</option>
            {SERVICES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          {touched.service && errors.service && (
            <p id="service-error" role="alert" className="mt-2 text-sm text-error flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.service}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[var(--text-on-surface)] mb-2">
            Mensagem
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Conte um pouco sobre seu projeto"
            value={fields.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("message")}
          />
        </div>

        {status === "error" && (
          <div role="alert" className="rounded-xl border border-error/40 bg-error/10 px-4 py-3 text-sm text-error flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            Não foi possível enviar agora. Tente novamente em instantes.
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full px-4 py-4 rounded-xl bg-tech text-white font-display font-semibold hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar mensagem"
          )}
        </button>
      </form>
    </div>
  );
}
