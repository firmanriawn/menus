import { useQuery, useMutation, useQueryClient } from 'react-query';
import { menuApi } from '../services/api';
import { Menu, CreateMenuDto, UpdateMenuDto, MoveMenuDto } from '../types/menu';
import { dummyMenus } from '../data/dummyMenus';

export const useMenus = () => {
  return useQuery<Menu[], Error>('menus', 
    async () => {
      try {
        return await menuApi.getMenus();
      } catch (error) {
        // Fallback to dummy data if API is not available
        console.log('API not available, using dummy data');
        return dummyMenus;
      }
    }, 
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    }
  );
};

export const useMenu = (id: string) => {
  return useQuery<Menu, Error>(['menu', id], () => menuApi.getMenu(id), {
    enabled: !!id,
  });
};

export const useCreateMenu = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Menu, Error, CreateMenuDto>(menuApi.createMenu, {
    onSuccess: () => {
      queryClient.invalidateQueries('menus');
    },
  });
};

export const useUpdateMenu = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Menu, Error, { id: string; data: UpdateMenuDto }>(
    ({ id, data }) => menuApi.updateMenu(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('menus');
      },
    }
  );
};

export const useDeleteMenu = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, Error, string>(menuApi.deleteMenu, {
    onSuccess: () => {
      queryClient.invalidateQueries('menus');
    },
  });
};

export const useMoveMenu = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Menu, Error, { id: string; data: MoveMenuDto }>(
    ({ id, data }) => menuApi.moveMenu(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('menus');
      },
    }
  );
};

export const useReorderMenu = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Menu, Error, { id: string; order: number }>(
    ({ id, order }) => menuApi.reorderMenu(id, order),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('menus');
      },
    }
  );
};
