import { BaseCard } from '@/src/components/Common';
import { ContactMethodsProps } from '@/src/types/contact';

export default function ContactMethods({ methods }: ContactMethodsProps) {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {methods.map((method) => {
          const Icon = method.icon;
          return (
            <BaseCard
              key={method.title}
              variant="contact"
              icon={<Icon className="w-7 h-7" />}
              title={method.title}
              description={method.description}
              contact={method.contact}
              color={method.color}
            />
          );
        })}
      </div>
    </section>
  );
}
