import { PokemonState } from '../../API/baseAPI'
import { useDispatch } from 'react-redux';
import { removePokemon, setRenamePokemon } from '../../store/slices/pokemonSlice';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

type StatsModalProps = {
  pokemon: PokemonState;
  onButtonClick: () => void;
}

export const StatsModal = ({ pokemon, onButtonClick }: StatsModalProps) => {
  const dispatch = useDispatch();
  const { name, sprites, order, weight } = pokemon;

  const renameSchema = z.object({
    newName: z.string()
      .min(2, "Имя должно содержать минимум 2 символа")
      .max(50, "Имя не должно превышать 50 символов")
      .regex(/^[a-zA-Zа-яА-Я0-9\s]+$/, "Имя содержит недопустимые символы")
      .refine(
        (newName) => newName !== name,
        { message: "Новое имя должно отличаться от старого" }
      )
  });

  type RenameFormData = z.infer<typeof renameSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset
  } = useForm<RenameFormData>({
    resolver: zodResolver(renameSchema),
    defaultValues: {
      newName: ""
    },
    mode: "onChange"
  });

  const handleRemovePokemon = (pokemonName: string) => {
    dispatch(removePokemon(pokemonName));
    onButtonClick();
  }


  const onSubmit = (data: RenameFormData) => {
    dispatch(setRenamePokemon({
      oldName: name,
      newName: data.newName
    }));

    reset();
  }

  return (
    <div style={{
      display: "flex",
      width: '524px',
      height: '240px',
      gap: '12px',
    }}
    ><div style={{
      display: "flex",
      gap: '12px',
    }}>
        <div>
          <img
            src={sprites.front_default}
            alt={name}
            width="143px"
            height="143px"
          />
          <div>
            <button onClick={() => handleRemovePokemon(name)}>
              Удалить покемона
            </button>
          </div>
        </div>
        <div style={{
          display: "flex",
          flexDirection: 'column',
          gap: '12px',
          fontWeight: 700,
          fontSize: "16px",
        }}>
          <div>Имя:{name}</div>
          <div>Деньги:{order}</div>
          <div>Вес:{weight}</div>
          <div>
            <div style={{
              display: "flex",
            }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <input
                    type="text"
                    className="custom-input"
                    placeholder="Псевдоним покемона"
                    {...register("newName")}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <button type="submit" disabled={!isValid}>
                    Сохранить
                  </button>
                </div>

                {errors.newName && (
                  <div style={{
                    color: 'red',
                  }}>
                    {errors.newName.message}
                  </div>
                )}

              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}