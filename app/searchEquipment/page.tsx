import Container from '@/app/components/Container';
import EmptyState from '@/app/components/EmptyState';
import React from 'react';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from '../components/ClientOnly';
import getEquipments,{IEquipmentParams} from '../actions/getEquipments';
import EquipmentCard from '../components/equipments/EquipmentCard';


interface HomeProps {
    searchParams: IEquipmentParams
  }

  const Search = async ({ searchParams }: HomeProps) => {
    const equipments = await getEquipments(searchParams);
    const currentUser = await getCurrentUser();
  
    if (equipments.length === 0) {
      return (
        <ClientOnly>
          <EmptyState showReset urlLink='/searchEquipment'/>
        </ClientOnly>
      );
    }
    return (
      <ClientOnly>
        <Container>
          <div
            className="mt-16 pt-28 md:pt-30 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 "
          >
            
            {equipments.map((equipment: any) => (
              <EquipmentCard
                currentUser={currentUser}
                key={equipment.id}
                data={equipment}
              />
            ))}
          </div>
        </Container>
      </ClientOnly>
    );
  };

export default Search;