'use client';

import Section from '@/components/Section/Section';
import { fetchNotesById } from '@/lib/api/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import css from './NoteDetails.module.css';
import Loader from '@/components/Loader/Loader';

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const { data: note, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNotesById(id),
    refetchOnMount: false,
  });
  return (
    <Section>
      {' '}
      {note && (
        <div className={css.container}>
          <h2 className={css.title}>{note.title}</h2>{' '}
          <p className={css.description}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.status}>{note.tag}</span>
          </div>
        </div>
      )}
      {isLoading && <Loader />}
    </Section>
  );
};

export default NoteDetailsClient;
