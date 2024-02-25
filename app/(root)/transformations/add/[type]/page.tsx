import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { creditFee, transformationTypes } from '@/constants'
import { getUserById, updateCredits } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
  const { userId } = auth();
  const transformation = transformationTypes[type];

  if(!userId) redirect('/sign-in')

  const user = await getUserById(userId);
  

    // Check if creditBalance is available in the user object before accessing it
     

  return (
    <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
    
      <section className="mt-10">
        <TransformationForm 
          action="Add"
          userId={userId}
          type={transformation.type as TransformationTypeKey}
          creditBalance={creditFee}
        />
      </section>
    </>
  )
}

export default AddTransformationTypePage